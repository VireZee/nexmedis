/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new client
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: "a@a.a"
 *               name:
 *                 type: string
 *                 example: "a"
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 api_key:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Already registered
 *       500:
 *         description: Server error
 */