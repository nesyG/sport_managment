import { Router } from "express";
import { authController } from "../controllers/auth";

const authRoutes = Router();

/**
   * @openapi
   * '/register':
   *  post:
   *    tags:
   *    - Auth
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
 authRoutes.post("/register", authController.postRegister);

/**
   * @openapi
   * '/register/verify/{uniqueString}':
   *  get:
   *     tags:
   *     - Auth
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
 authRoutes.get("/register/verify/:uniqueString", authController.verifyEmail);

/**
   * @openapi
   * '/login':
   *  post:
   *    tags:
   *    - Auth
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
 authRoutes.post("/login", authController.postLogin);

export default authRoutes;
