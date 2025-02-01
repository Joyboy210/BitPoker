import * as THREE from "three";
export class CardTextureManager {
    private readonly x = 7.5;
    private ValueCords(value: number, shape: number): { startX: number; startY: number; endX: number; endY: number } {
        // Logic to determine coordinates for the value symbol in the symbol table based on value and color
        // Example logic, adjust as per your symbol table layout
        // Example logic, adjust as per your symbol table layout
        let startX = 4; // Adjust these values based on your symbol table layout
        let startY = shape < 2 ? 760 : 824;
        startX += (value - 1) * 53 + (value == 11 ? 1 : value == 12 ? -2 : 0) * 4;
        let endX = startX + 50 + (value == 11 ? 1 : 0) * -10;
        let endY = startY + 50;

        // Adjust coordinates based on value and color

        return { startX, startY, endX, endY };
    }

    private ShapeCords(
        // @ts-ignore
        value: number,
        shape: number
    ): { startX: number; startY: number; endX: number; endY: number } {
        // Logic to determine coordinates for the shape symbol in the symbol table based on value and color

        let startX = 2; // Adjust these values based on your symbol table layout
        let startY = 260;

        startX = shape * 147;

        let endX = startX + 133;
        let endY = startY + 130;

        // Adjust coordinates based on value and color

        return { startX, startY, endX, endY };
    }
    private generateCardTexture(value: number, shape: number): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            // Load the individual symbols based on value and color from the symbol table
            const valueSymbolCoordinates = this.ValueCords(value, shape);
            const shapeSymbolCoordinates = this.ShapeCords(value, shape);

            // Load value and shape symbols based on extracted coordinates
            const valueSymbolTexture = this.extractTextureRegion(this.main, valueSymbolCoordinates);
            const shapeSymbolTexture = this.extractTextureRegion(this.main, shapeSymbolCoordinates);

            const canvas = document.createElement("canvas");
            canvas.width = 58 * 4;
            canvas.height = 78 * 4;
            const context = canvas.getContext("2d");

            if (context === null) throw Error("context isnt 2d");

            Promise.all([valueSymbolTexture.image.onload, shapeSymbolTexture.image.onload])
                .then(() => {
                    // Fill with pure black
                    context.fillStyle = "#000000";
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    // Use 'lighter' composite operation for better contrast
                    context.globalCompositeOperation = "lighter";

                    // Draw the symbols
                    context.drawImage(shapeSymbolTexture.image, 50, 75);
                    context.drawImage(valueSymbolTexture.image, 50 + 133 / 2 - 53 / 2, 125 + 133 / 2 + 50 / 2);

                    // Reset composite operation
                    context.globalCompositeOperation = "source-over";

                    const finalTexture = new THREE.CanvasTexture(canvas);
                    resolve(finalTexture);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    private generateEmptyTexture() {
        // Create a canvas and render the symbols onto it
        const canvas = document.createElement("canvas");
        canvas.width = 58 * 4;
        canvas.height = 78 * 4;
        const context = canvas.getContext("2d");

        if (context === null) throw Error("context isnt 2d");

        // Ensure all textures are loaded before rendering
        // Use Three.js and canvas manipulation to combine the textures onto the white background
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#FF6D2C";
        context.fillRect(this.x, this.x, canvas.width - this.x * 2, canvas.height - this.x * 2);

        const finalTexture = new THREE.CanvasTexture(canvas);
        return finalTexture;
    }

    // Functions to extract coordinates and manipulate textures would go here
    // getValueSymbolCoordinates, getShapeSymbolCoordinates, createWhiteTexture, extractTextureRegion
    private extractTextureRegion(
        texture: THREE.Texture,
        { endX, endY, startX, startY }: { startX: number; startY: number; endX: number; endY: number }
    ): THREE.Texture {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context === null) throw Error("context isnt 2d");

        canvas.width = endX - startX;
        canvas.height = endY - startY;

        // Draw the specified region from the texture onto the canvas
        context.drawImage(texture.image, -startX, -startY);

        // Convert the canvas to a new Three.js texture
        const extractedTexture = new THREE.CanvasTexture(canvas);

        return extractedTexture;
    }
    private map: Map<number, THREE.Texture> = new Map();
    public async card(value: number, shape: number): Promise<THREE.Texture> {
        const key = shape * 100 + value;

        let texture: THREE.Texture;
        if (this.map.has(key)) texture = this.map.get(key) as THREE.Texture;
        else {
            texture = await this.generateCardTexture(value, shape);
            this.map.set(key, texture);
        }
        return texture;
    }
    public enemy() {
        return this.generateEmptyTexture();
    }

    private main: THREE.Texture;
    constructor(main: THREE.Texture) {
        this.main = main;
    }
}
