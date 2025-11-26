import swaggerJSDoc from 'swagger-jsdoc'

const swagger = swaggerJSDoc({
    definition: {
        info: {
            title: 'Nexmedis API',
            version: '1.0.0',
            description: 'API documentation for backend test'
        }
    },
    apis: ['./src/docs/*.doc.ts']
})
export default swagger