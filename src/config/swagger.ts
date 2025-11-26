import swaggerJSDoc from 'swagger-jsdoc'

const swagger = swaggerJSDoc({
    definition: {
        openapi: '3.1.1',
        info: {
            title: 'Nexmedis API',
            version: '1.0.0',
            description: 'API documentation for backend test'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/docs/*.doc.ts']
})
export default swagger