/**
 * @swagger
 * /api/usage/stream:
 *   get:
 *     summary: Open a real-time Server-Sent Events stream for usage updates
 *     tags: [Usage]
 *     description: |
 *       Opens a persistent SSE (Server-Sent Events) connection that streams real-time updates
 *       whenever daily or top usage changes.
 * 
 *       **This endpoint does not close**  
 *       Use a Browser, SSE client, or curl to consume it.
 * 
 *       **Example stream output:**
 * 
 *       data: {"type":"daily","client_id":"7dcb0cd247aa94896e665c337696a7be","requests":1}
 *       data: {"type":"top","client_id":"7dcb0cd247aa94896e665c337696a7be","requests":31}
 *       data: {"type":"daily","client_id":"cac74bf4c69eb259b3be6343a7594409","requests":2}
 *       data: {"type":"top","client_id":"cac74bf4c69eb259b3be6343a7594409","requests":36}
 *       data: {"type":"daily","client_id":"cac74bf4c69eb259b3be6343a7594409","requests":3}
 *       data: {"type":"top","client_id":"cac74bf4c69eb259b3be6343a7594409","requests":36}
 *       data: {"type":"daily","client_id":"cac74bf4c69eb259b3be6343a7594409","requests":4}
 *       data: {"type":"top","client_id":"cac74bf4c69eb259b3be6343a7594409","requests":37}
 *       data: {"type":"daily","client_id":"7dcb0cd247aa94896e665c337696a7be","requests":2}
 *       data: {"type":"top","client_id":"7dcb0cd247aa94896e665c337696a7be","requests":31}
 */