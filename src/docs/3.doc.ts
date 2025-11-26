/**
 * @swagger
 * /api/usage/top:
 *   get:
 *     summary: Get the top 3 clients with the highest request count in the last 24 hours
 *     tags: [Usage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the top 3 clients with the highest request counts in the last 24 hours
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 properties:
 *                   client_id:
 *                     type: string
 *                     example: "7dcb0cd247aa94896e665c337696a7be"
 *                   requests:
 *                     type: number
 *                     example: 29
 *             example:
 *               - client_id: "7dcb0cd247aa94896e665c337696a7be"
 *                 requests: 29
 *               - client_id: "cac74bf4c69eb259b3be6343a7594409"
 *                 requests: 15
 *       400:
 *         description: Missing or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "API Key required!"
 *       401:
 *         description: Missing or invalid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing or invalid authorization header!"
 *       403:
 *         description: Request blocked due to unauthorized IP address
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "IP isn't allowed!"
 */