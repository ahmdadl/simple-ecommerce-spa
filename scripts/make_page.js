#!/usr/bin/env node

import { promises as fs } from 'fs';
import { join, resolve, sep } from 'path'; // Added sep to the import
import { createInterface } from 'readline/promises';

// Create readline interface
const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function addPage() {
    let moduleDir;
    let camelCaseModuleName;

    // Get current working directory
    const cwd = resolve(process.cwd());

    // Check if we're inside a module directory (e.g., src/modules/about)
    const pathSegments = cwd.split(sep); // Changed path.sep to sep
    const modulesIndex = pathSegments.indexOf('modules');
    if (modulesIndex !== -1 && modulesIndex < pathSegments.length - 1) {
        // Running inside a module directory
        camelCaseModuleName = pathSegments[modulesIndex + 1];
        moduleDir = join(...pathSegments.slice(0, modulesIndex + 2)); // e.g., src/modules/about
        console.log(`Detected module: '${camelCaseModuleName}'`);
    } else {
        // Running from root or elsewhere, prompt for module name
        const moduleName = await readline.question('Enter the module name: ');
        camelCaseModuleName = moduleName.toLowerCase().replace(/\s+/g, '');
        moduleDir = join('src', 'modules', camelCaseModuleName);
    }

    // Prompt for page name
    const pageName = await readline.question('Enter the page name: ');
    const studlyCasePageName = pageName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/^./, (match) => match.toUpperCase());

    // Define paths
    const pagesDir = join(moduleDir, 'pages');
    const pageFile = join(pagesDir, `${studlyCasePageName}.tsx`);

    try {
        // Check if module exists
        await fs.access(moduleDir);

        // Ensure pages directory exists
        await fs.mkdir(pagesDir, { recursive: true });

        // Check if page already exists
        try {
            await fs.access(pageFile);
            console.log(
                `Page '${studlyCasePageName}' already exists in '${moduleDir}/pages/'!`
            );
            return;
        } catch {
            // Page doesn't exist, proceed with creation
        }

        // Write page file
        const pageContent = `
export default function ${studlyCasePageName}Page() {
    return (
        <>
            <h1 className='text-3xl font-bold'>${studlyCasePageName}Page</h1>
        </>
    );
}
        `;
        await fs.writeFile(pageFile, pageContent.trim());

        console.log(
            `Page '${studlyCasePageName}' added successfully to '${moduleDir}/pages/' with route!`
        );
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(
                `Error: Module '${camelCaseModuleName}' does not exist at '${moduleDir}'.`
            );
        } else {
            console.error('Error adding page:', error);
        }
    } finally {
        readline.close();
    }
}

// Run the script
addPage();
