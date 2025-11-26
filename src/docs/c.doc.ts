/**
 * @swagger
 * /api/usage/daily:
 *   get:
 *     summary: Get daily usage statistics for the last 7 days
 *     tags: [Usage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns daily request counts for each client over the last 7 days
 *         content:
 *           application/json:
 *             schema:
 *               additionalProperties:
 *                 items:
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: "2025-11-26"
 *                     requests:
 *                       type: number
 *                       example: 3
 *             example:
 *               7dcb0cd247aa94896e665c337696a7be:
 *                 - date: "2025-11-26"
 *                   requests: 3
 *               cac74bf4c69eb259b3be6343a7594409:
 *                 - date: "2025-11-26"
 *                   requests: 1
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