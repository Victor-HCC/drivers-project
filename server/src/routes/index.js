const { Router } = require("express");
//importamos los routers
const driversRouter = require('./driversRouter.js');
const teamsRouter = require('./teamsRouter.js')

const router = Router();

//configuramos las rutas para sus reséctivos routers
router.use('/drivers', driversRouter);
router.use('/teams', teamsRouter);

module.exports = router;
