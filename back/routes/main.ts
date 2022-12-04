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
   *        description: Name of the sport
   *      - in: query
   *        name: ageGroup
   *        type: string
   *        description: Age group ("children")
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
   *      description: Takes in name of the sport
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
   *      description: Takes in name of the sport
   *   responses:
   *    200:
   *     description: Success
   *    400:
   *     description: Bad request
   */
mainRoutes.put("/unenroll/:sport", mainController.unenroll);

/**
   * @openapi
   * '/feedback':
   *  put:
   *   tags:
   *   - User
   *   summary: Leave comment and grade for specific sport
   *   parameters:
   *    - in: query
   *      name: id
   *      type: string
   *      description: Takes in users id
   *    - in: query
   *      name: comment
   *      type: string
   *      description: Takes in users comment
   *    - in: query
   *      name: grade
   *      type: number
   *      description: Takes in users grade
   *   responses:
   *    200:
   *     description: Success
   *    400:
   *     description: Bad request
   */
mainRoutes.put("/feedback/:sport", mainController.commentSport);

export default mainRoutes;
