#!/usr/bin/env node

import { promises as fs } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline/promises';

// Create readline interface
const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function addComponent() {
    // Prompt for module name
    const moduleName = await readline.question('Enter the module name: ');
    const camelCaseModuleName = moduleName.toLowerCase().replace(/\s+/g, '');

    // Prompt for component name
    const componentName = await readline.question('Enter the component name: ');
    const studlyCaseComponentName = componentName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/^./, (match) => match.toUpperCase());

    // Define paths
    const moduleDir = join('src', 'modules', camelCaseModuleName);
    const componentsDir = join(moduleDir, 'components');
    const componentFile = join(componentsDir, `${studlyCaseComponentName}.tsx`);

    try {
        // Check if module exists
        await fs.access(moduleDir);

        // Ensure components directory exists
        await fs.mkdir(componentsDir, { recursive: true });

        // Check if component already exists
        try {
            await fs.access(componentFile);
            console.log(
                `Component '${studlyCaseComponentName}' already exists in '${moduleDir}/components/'!`
            );
            return;
        } catch {
            // Component doesn't exist, proceed with creation
        }

        // Write component file
        const componentContent = `
export default function ${studlyCaseComponentName}() {
    return (
        <div>
            <h2>${studlyCaseComponentName} Component</h2>
            <p>This is the ${studlyCaseComponentName} component in the ${camelCaseModuleName} module.</p>
        </div>
    );
}
        `;
        await fs.writeFile(componentFile, componentContent.trim());

        console.log(
            `Component '${studlyCaseComponentName}' added successfully to '${moduleDir}/components/'!`
        );
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(
                `Error: Module '${camelCaseModuleName}' does not exist at '${moduleDir}'.`
            );
        } else {
            console.error('Error adding component:', error);
        }
    } finally {
        readline.close();
    }
}

// Run the script
addComponent();
