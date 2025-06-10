#!/usr/bin/env node

import { promises as fs } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline/promises';

// Create readline interface
const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const generateStudlyCaseName = (input) => {
    // Replace spaces or hyphens with nothing, split by spaces/hyphens, filter out empty strings
    const words = input
        .replace(/[-_\s]+/g, ' ')
        .split(' ')
        .filter((word) => word);

    // Convert to camelCase first, then capitalize the first letter
    const camelCase = words
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('');

    // Return studly case (PascalCase)
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

function toSlug(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // insert space before camelCase
        .replace(/[^a-zA-Z0-9]+/g, '-') // replace non-alphanumeric characters with hyphen
        .replace(/^-+|-+$/g, '') // remove leading/trailing hyphens
        .toLowerCase(); // convert to lowercase
}

async function createModule() {
    // Prompt for module name
    const moduleName = toSlug(
        await readline.question('Enter the module name: ')
    );
    const camelCaseName = moduleName.toLowerCase().replace(/\s+/g, '');

    const studlyCaseName = generateStudlyCaseName(moduleName);

    // Define paths
    const moduleDir = join('src', 'modules', camelCaseName);
    const pagesDir = join(moduleDir, 'pages');
    const componentsDir = join(moduleDir, 'components');
    const pageFile = join(pagesDir, `${studlyCaseName}Page.tsx`);

    try {
        // Create directories
        await fs.mkdir(moduleDir, { recursive: true });
        await fs.mkdir(pagesDir);
        await fs.mkdir(componentsDir);

        // Write page file
        const pageContent = `
export default function ${studlyCaseName}Page() {
    return (
        <>
            <h1 className='text-3xl font-bold'>${studlyCaseName}Page</h1>
        </>
    );
}
        `;
        await fs.writeFile(pageFile, pageContent.trim());

        console.log(
            `Module '${camelCaseName}' created successfully at ${moduleDir}!`
        );
    } catch (error) {
        console.error('Error creating module:', error);
    } finally {
        readline.close();
    }
}

// Run the script
createModule();
