import { Router } from "express";
import { mainController } from "../controllers/main";

const mainRoutes = Router();

//Main Routes

/**
   * @openapi
   * '/mainPage/classes':
   *  get:
   *     tags:
   *     - User
   *     summary: Get selected sports based on age group
   *     parameters:
   *      - in: query
   *        name: sports
   *        type: string
   *        description: Takes in one or multiple comma seperated, case sensitive sport names
   *      - in: query
   *        name: ageGroups
   *        type: string
   *        description: Takes in one of the four case sensitive age groups ("children", "youth", "youngAdults", "adults")
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
mainRoutes.get("/classes", mainController.getSelectedSports);

/**
   * @openapi
   * '/mainPage/enroll/{sport}':
   *  put:
   *   tags:
   *   - User
   *   summary: Enroll in selected sports class
   *   parameters:
   *    - in: path
   *      name: sport
   *      type: string
   *      description: Takes in case sensitive name of the sport
   *   responses:
   *    200:
   *     description: Success
   *    400:
   *     description: Bad request
   */
mainRoutes.put("/enroll/:sport", mainController.enroll);

/**
   * @openapi
   * '/mainPage/unenroll/{sport}':
   *  put:
   *   tags:
   *   - User
   *   summary: Unenroll from sports class/es
   *   parameters:
   *    - in: path
   *      name: sport
   *      type: string
   *      description: Takes in case sensitive name of the sport
   *   responses:
   *    200:
   *     description: Success
   *    400:
   *     description: Bad request
   */
mainRoutes.put("/unenroll/:sport", mainController.unenroll);

/**
   * @openapi
   * '/mainPage/feedback/{sport}':
   *  put:
   *   tags:
   *   - User
   *   summary: Leave comment and grade for specific sport
   *   parameters:
   *    - in: path
   *      name: sport
   *      type: string
   *      description: Takes in case sensitive sport name for which the user wants to leave a comment
   *   requestBody:
   *    required: true
   *    description: Comment and grade sport class
   *    content:
   *     application/json:
   *      schema:
   *       type: object
   *       properties:
   *        comment:
   *         type: string
   *         example: Great class!
   *        grade:
   *         type: number
   *         example: 4
   *   responses:
   *    200:
   *     description: Success
   *    400:
   *     description: Bad request
   */
mainRoutes.put("/feedback/:sport", mainController.commentSport);

export default mainRoutes;
