const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const balanceController = require('../controllers/balance.controller')
const multer = require('multer')
const upload = multer()

// test
router.get('/', (req, res) => {
    res.send('Hello World!')
})

// auth
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)
router.post('/login-with-google', authController.loginWithGoogle)

// user info db
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/user/upload', upload.single('file'), userController.uploadProfilePicture)

// balance info db
router.post('/balance', balanceController.postUserBalance)
router.get('/balance/:id', balanceController.getUserBalance)
router.put('/balance/:id', balanceController.updateBalance)
router.delete('/balance/:id', balanceController.deleteBalance)
router.delete('/balanceOneIncome/:id', balanceController.deleteOneIncome)
router.delete('/balanceOneFee/:id', balanceController.deleteOneFee)

module.exports = router