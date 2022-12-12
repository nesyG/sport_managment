import { Router } from "express";
import { usersController } from "../controllers/users";

const usersRoutes = Router();

/**
 * @openapi
 * '/users/{id}':
 *  get:
 *    tags:
 *    - Users
 *    summary: Get a single user from the db based on his MongoDB _id (ADMIN ONLY)
 *    parameters:
 *     - name: id
 *       in: path
 *       description: Takes in MongoDB _id of the user
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: User not found
 */
usersRoutes.get("/:id", usersController.getUserAsAdmin);

/**
 * @openapi
 * '/users':
 *  get:
 *    tags:
 *    - Users
 *    summary: Get all users from the db (ADMIN ONLY)
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */
usersRoutes.get("/", usersController.getAllUsersAsAdmin);

/**
 * @openapi
 * '/users':
 *  post:
 *    tags:
 *    - Users
 *    summary: Create new user (ADMIN ONLY)
 *    requestBody:
 *     required: true
 *     description: Create new user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UsersSchema'
 *    responses:
 *     200:
 *      description: Success
 *     400:
 *      description: Bad request
 */
usersRoutes.post("/", usersController.createUserAsAdmin);

/**
 * @openapi
 * '/users/{id}':
 *  put:
 *    tags:
 *    - Users
 *    summary: Update user (ADMIN ONLY)
 *    parameters:
 *     - in: path
 *       name: id
 *       type: string
 *       description: Takes in MongoDB _id of the user
 *    requestBody:
 *      required: true
 *      description: Update the user data
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/UsersSchema'
 *    responses:
 *     200:
 *      description: Success
 *     400:
 *      description: Bad request
 */
usersRoutes.put("/:id", usersController.updateUserAsAdmin);

/**
 * @openapi
 * '/users/{id}':
 *  delete:
 *    tags:
 *    - Users
 *    summary: Delete a single user from the User collection and from his enrolled classes in Sports collection, based on his MongoDB _id (ADMIN ONLY)
 *    parameters:
 *     - name: id
 *       in: path
 *       description: Takes in MongoDB _id of the user
 *       required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: User not found
 */
usersRoutes.delete("/:id", usersController.deleteUserAsAdmin);

export default usersRoutes;
