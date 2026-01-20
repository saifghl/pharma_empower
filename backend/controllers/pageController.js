const pool = require('../config/db');

// Get Page Content by Slug
exports.getPageContent = async (req, res) => {
    try {
        const { slug } = req.params;

        // 1. Get Page Info
        const [pages] = await pool.query('SELECT * FROM pages WHERE slug = ?', [slug]);
        if (pages.length === 0) {
            return res.status(404).json({ message: 'Page not found' });
        }
        const page = pages[0];

        // 2. Get Page Sections
        const [sections] = await pool.query(
            'SELECT * FROM page_sections WHERE page_id = ? ORDER BY position',
            [page.id]
        );

        // 3. Get Content for each Section (Optimization: Get all content for these sections in one go)
        const sectionIds = sections.map(s => s.id);
        let contentMap = {};

        if (sectionIds.length > 0) {
            const [contents] = await pool.query(
                'SELECT * FROM section_content WHERE section_id IN (?)',
                [sectionIds]
            );

            // Group content by section_id
            contents.forEach(c => {
                if (!contentMap[c.section_id]) {
                    contentMap[c.section_id] = [];
                }
                contentMap[c.section_id].push(c);
            });
        }

        // 4. Construct Hierarchy
        const result = {
            ...page,
            sections: sections.map(section => {
                const contents = contentMap[section.id] || [];
                // For highlights, return all contents. For others, usually just one.
                if (section.section_type === 'highlights') {
                    return { ...section, items: contents.map(c => JSON.parse(c.content || '{}')) };
                }
                return { ...section, content: contents[0] };
            })
        };

        // 5. Transform for Frontend (match expected JSON structure)
        // The frontend expects specific keys (hero, details, headers). 
        // We need to map DB sections back to these keys.
        // Assuming 'section_type' column holds keys like 'hero', 'details', 'highlights'.

        const frontendStructure = {};
        result.sections.forEach(s => {
            if (s.section_type) {
                if (s.section_type === 'highlights') {
                    // Highlights needs array
                    frontendStructure.highlights = s.items || [];
                } else {
                    // ... existing logic ...
                    frontendStructure[s.section_type] = {
                        title: s.heading,
                        subtitle: s.subheading,
                        ... (s.content ? JSON.parse(s.content.content || '{}') : {})
                    };

                    // If we are not storing JSON, we need to map columns.
                    // DB has: heading, subheading. Content table has: content, button_text, button_link.
                    // Frontend 'hero' needs: title, subtitle, bgImage, ctaText.
                    if (s.section_type === 'hero') {
                        frontendStructure.hero = {
                            title: s.heading,
                            subtitle: s.subheading,
                            bgImage: s.content?.button_link, // Reusing button_link for bgImage URL for now? Or adds column.
                            ctaText: s.content?.button_text
                        };
                    } else if (s.section_type === 'details') {
                        frontendStructure.details = {
                            mission: s.heading,
                            vision: s.subheading
                        };
                    } else if (s.section_type === 'info') {
                        // Contact info might be stored in content text
                    }
                }
            }
        });

        // Ensure other keys exist if missing
        // Return raw for now to debug or formatted? 
        // Let's return formatted to match ContentManagement.jsx expectation if possible,
        // OR return generic structure and let frontend adapt.
        // Given complexity, I will modify ContentManagement to handle a generic structure OR 
        // I'll make the API return the EXACT structure the frontend currently expects (DEFAULT_CONTENT).

        // For this task, getting the exact structure from a relational DB is complex without specific mapping.
        // I will return the raw relational data and let the Frontend Adapter handle the mapping.

        res.json(frontendStructure);

    } catch (error) {
        console.error('Get Page Error:', error);
        res.status(500).json({ message: 'Failed to fetch page content' });
    }
};

// Update Page Content
exports.updatePageContent = async (req, res) => {
    try {
        const { slug } = req.params;
        const pageData = req.body; // Expects object with keys like 'hero', 'details'

        // Find Page
        const [pages] = await pool.query('SELECT * FROM pages WHERE slug = ?', [slug]);
        if (pages.length === 0) return res.status(404).json({ message: 'Page not found' });
        const pageId = pages[0].id;

        // Iterate keys (hero, details, etc.)
        for (const [sectionType, data] of Object.entries(pageData)) {
            // Upsert Page Section
            // We assume 1 section per type for simplicy (except highlights)

            if (sectionType === 'highlights') {
                // 1. Get/Create Section
                let heading = 'Highlights';
                const [existing] = await pool.query(
                    'SELECT id FROM page_sections WHERE page_id = ? AND section_type = ?',
                    [pageId, sectionType]
                );
                let sectionId;
                if (existing.length > 0) {
                    sectionId = existing[0].id;
                } else {
                    const [ins] = await pool.query(
                        'INSERT INTO page_sections (page_id, section_type, heading) VALUES (?, ?, ?)',
                        [pageId, sectionType, heading]
                    );
                    sectionId = ins.insertId;
                }

                // 2. Replace all content (simplest strategy: delete all for section, re-insert)
                await pool.query('DELETE FROM section_content WHERE section_id = ?', [sectionId]);

                // 3. Insert new items
                if (Array.isArray(data)) {
                    for (const item of data) {
                        // Item has {id, title, description}
                        // Store as JSON in content
                        await pool.query(
                            'INSERT INTO section_content (section_id, content) VALUES (?, ?)',
                            [sectionId, JSON.stringify(item)]
                        );
                    }
                }
                continue;
            }

            // ... existing logic for single sections ...
            let heading = data.title || data.mission || '';
            let subheading = data.subtitle || data.vision || '';

            // Check if section exists
            const [existing] = await pool.query(
                'SELECT id FROM page_sections WHERE page_id = ? AND section_type = ?',
                [pageId, sectionType]
            );

            let sectionId;
            if (existing.length > 0) {
                sectionId = existing[0].id;
                await pool.query(
                    'UPDATE page_sections SET heading = ?, subheading = ? WHERE id = ?',
                    [heading, subheading, sectionId]
                );
            } else {
                const [ins] = await pool.query(
                    'INSERT INTO page_sections (page_id, section_type, heading, subheading) VALUES (?, ?, ?, ?)',
                    [pageId, sectionType, heading, subheading]
                );
                sectionId = ins.insertId;
            }

            // Update Content (bgImage, ctaText etc stored in content/button fields)
            // Mapping: bgImage -> button_link (hacky but works without schema change), ctaText -> button_text
            const bgImage = data.bgImage || data.address || ''; // Address reuse
            const ctaText = data.ctaText || data.phone || '';   // Phone reuse
            const extraContent = data.email || '';

            // Upsert Content
            await pool.query(
                `INSERT INTO section_content (section_id, content, button_text, button_link)
                  VALUES (?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE content = VALUES(content), button_text = VALUES(button_text), button_link = VALUES(button_link)`,
                [sectionId, extraContent, ctaText, bgImage]
            );
        }

        res.json({ message: 'Page updated successfully' });

    } catch (error) {
        console.error('Update Page Error:', error);
        res.status(500).json({ message: 'Failed to update page' });
    }
};

exports.getAllPages = async (req, res) => {
    try {
        const [pages] = await pool.query('SELECT slug, title FROM pages');
        res.json(pages);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
}
