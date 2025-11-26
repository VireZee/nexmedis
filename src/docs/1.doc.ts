/**
 * @swagger
 * /api/log:
 *   post:
 *     summary: Log API usage
 *     tags: [Usage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - api_key
 *               - ip
 *               - endpoint
 *             properties:
 *               api_key:
 *                 type: string
 *                 description: Client API key
 *                 example: "18d387a78d6d55b4854b7ff7d5925042"
 *               ip:
 *                 type: string
 *                 example: "192.168.0.2"
 *               endpoint:
 *                 type: string
 *                 example: "/hello"
 *               timestamp:
 *                 type: string
 *                 format: ISO 8601
 *                 example: "2025-01-01T18:00:00.000Z"
 *     responses:
 *       200:
 *         description: Log saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
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
 *         description: Invalid API Key
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid API Key!"
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rate limit exceeded (per minute)!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */