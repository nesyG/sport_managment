import { Router } from "express";
import { loginController } from "../controllers/login";

const loginRoutes = Router();

/**
   * @openapi
   * '/api/register':
   *  post:
   *    tags:
   *    - Login
   *    summary: Register new user
   *    requestBody:
   *     required: true
   *     description: Register new user (choose from one of the four case sensitive ageGroups offered:"children","youth","youngAdults","adults")
   *     content:
   *      application/json:
   *       schema:
   *        type: object
   *        properties:
   *         firstName:
   *          type: string
   *          example: Jane
   *         lastName:
   *          type: string
   *          example: Doe
   *         email:
   *          type: string
   *          example: janedoe@gmail.com
   *         password:
   *          type: string
   *          example: example123
   *         confirmPassword:
   *          type: string
   *          example: example123
   *         ageGroup:
   *          type: string
   *          example: children
   *    responses:
   *     200:
   *      description: Success
   *     400:
   *      description: Bad request
   */
loginRoutes.post("/register", loginController.postRegister);

/**
   * @openapi
   * '/api/verify/{uniqueString}':
   *  get:
   *     tags:
   *     - Login
   *     summary: Verifies the new user using unique string
   *     parameters:
   *      - in: path
   *        name: uniqueString
   *        type: string
   *        description: Unique string that verifies the user
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
loginRoutes.get("/verify/:uniqueString", loginController.verifyEmail);

/**
   * @openapi
   * '/api/login':
   *  post:
   *    tags:
   *    - Login
   *    summary: Login for user or admin
   *    requestBody:
   *     required: true
   *     description: Login with your email and password
   *     content:
   *      application/json:
   *       schema:
   *        type: object
   *        properties:
   *         email:
   *          type: string
   *          example: igvoic.work@gmail.com
   *         password:
   *          type: string
   *          example: 12345678
   *    responses:
   *     200:
   *      description: Success
   *     400:
   *      description: Bad request
   */
loginRoutes.post("/login", loginController.postLogin);

export default loginRoutes;
