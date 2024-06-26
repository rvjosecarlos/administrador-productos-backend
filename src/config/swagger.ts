import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API de operaciones relacionadas con los productos'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "Documentación API para productos"
        }
    },
    apis: ['./src/router.ts']
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://www.svgrepo.com/show/530439/api-interface.svg');
            width: 100px;
            height: 100px;
        }
    `,
    customSiteTitle: 'Documentación REST - API - Express - TypeScript'
}
export default swaggerSpec;
export { swaggerUiOptions };