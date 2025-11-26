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
 *             required:
 *               - email
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "a"
 *               email:
 *                 type: string
 *                 example: "a@a.com"
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 client_id:
 *                   type: string
 *                   example: "7dcb0cd247aa94896e665c337696a7be"
 *                 name:
 *                   type: string
 *                   example: "a"
 *                 email:
 *                   type: string
 *                   example: "a@a.com"
 *                 api_key:
 *                   type: string
 *                   example: "18d387a78d6d55b4854b7ff7d5925042"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI3ZGNiMGNkMjQ3YWE5NDg5NmU2NjVjMzM3Njk2YTdiZSIsImlhdCI6MTc2NDE1NDE1MSwiZXhwIjoxNzY0NzU4OTUxfQ.yRFWiSQzHm_L-sGxbQugZhP_uLNeJ_DBE8Bo98wfMLWKSQ5BfIIjLRuiL79wpZPtvFmOeXH1IEyDjhY7ULaFLw"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and Email required!"
 *       409:
 *         description: Already registered
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email already registered!"
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