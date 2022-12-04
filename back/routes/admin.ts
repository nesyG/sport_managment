import { Router } from "express";
import { adminController } from "../controllers/admin";


const adminRoutes = Router();

// Users

/**
   * @openapi
   * '/admin/users':
   *  post:
   *    tags:
   *    - Admin
   *    summary: Create new user
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
adminRoutes.post("/users", adminController.createUser);

/**
  * @openapi
  * '/admin/users/{id}':
  *  get:
  *    tags:
  *    - Admin
  *    summary: Get a single user from the db based on his MongoDB _id
  *    parameters:
  *     - name: id
  *       in: path
  *       description: MongoDB _id of the user
  *       required: true
  *    responses:
  *      200:
  *        description: Success
  *      404:
  *        description: User not found
  */
adminRoutes.get("/users/:id", adminController.getUser);

/**
   * @openapi
   * '/admin/users':
   *  get:
   *    tags:
   *    - Admin
   *    summary: Get all users from the db
   *    responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   */
adminRoutes.get("/users", adminController.getAllUsers);


/**
   * @openapi
   * '/admin/users/{id}':
   *  put:
   *    tags:
   *    - Admin
   *    summary: Update user
   *    parameters:
   *     - in: path
   *       name: id
   *       type: string
   *       description: Takes in MongoDb _id
   *    requestBody:
   *      required: true
   *      description: Create new class schedule.
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
adminRoutes.put("/users/:id", adminController.updateUser);

/**
  * @openapi
  * '/admin/users/{id}':
  *  delete:
  *    tags:
  *    - Admin
  *    summary: Delete a single user from the User collection and from his enrolled classes in Sports collection, based on his MongoDB _id
  *    parameters:
  *     - name: id
  *       in: path
  *       description: Mongo _id of the user
  *       required: true
  *    responses:
  *      200:
  *        description: Success
  *      404:
  *        description: User not found
  */
adminRoutes.delete("/users/:id", adminController.deleteUser);

/**
   * @openapi
   * '/admin/feedback':
   *  get:
   *    tags:
   *    - Admin
   *    summary: Get users comments and average grade for selected sport
   *    parameters:
   *     - in: query
   *       name: sport
   *       type: string
   *       description: Takes in a sport name
   *    responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   */
adminRoutes.get("/feedback", adminController.getFeedback);


// Sports

/**
   * @openapi
   * '/admin/sports':
   *  put:
   *    tags:
   *    - Admin
   *    summary: Update sports class
   *    parameters:
   *     - in: query
   *       name: sport
   *       type: string
   *       example: Football
   *       description: Takes sport name for sport admin wants to update
   *     - in: query
   *       name: ageGroup
   *       type: string
   *       example: children
   *       description: Takes in one of the four age groups ("children", "youth", "youngAdults", "adults")
   *     - in: query
   *       name: classSchedule
   *       type: string
   *       example: t1
   *       description: Takes in one of the three time slots when sports classes are held ("t1", "t2", "t3")
   *    requestBody:
   *      required: true
   *      description: Create new class schedule
   *      content:
   *        application/json:
   *         schema:
   *           $ref: '#/components/schemas/ClassTimeSchema'
   *    responses:
   *     200:
   *      description: Success
   *     400:
   *      description: Bad request
   */
adminRoutes.put("/sports", adminController.updateSportClass);

/**
   * @openapi
   * '/admin/sports':
   *  get:
   *    tags:
   *    - Admin
   *    summary: Get selected sports from the db
   *    parameters:
   *     - in: query
   *       name: sports
   *       type: array
   *       description: Takes in one or multiple comma seperated, case sensitive sport names
   *       explode: false
   *    responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   */
adminRoutes.get("/sports", adminController.getSports);



export default adminRoutes;
