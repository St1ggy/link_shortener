// /api/auth
const { Router }                  = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt                      = require('bcryptjs')
const jwt                         = require('jsonwebtoken')
const config                      = require('config')

const User = require('../models/User')

const router = Router()

const authValidations = [
  check('email', 'Некорректный e-mail').normalizeEmail().isEmail(),
  check('password', 'Минимальная длина пароля 6 символов')
    .isLength({ min: 6 }),
]

const loginError = 'Неправильный e-mail или пароль'

router.post(
  '/register',
  authValidations,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({
                               errors : errors.array(),
                               message: 'Некорректные данные',
                             })
        return
      }

      const { email, password } = req.body
      const candidate           = await User.findOne({ email })

      if (candidate) {
        res.status(400).json({ message: 'Такой пользователь уже есть' })
        return
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user           = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'Пользователь успешно создан' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  },
)

router.post(
  '/login',
  authValidations,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json(
          {
            errors : errors.array(),
            message: loginError,
          },
        )
        return
      }

      const { email, password } = req.body
      const user                = await User.findOne({ email })
      if (!user) {
        res.status(400).json({ message: loginError })
        return
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        res.status(400).json({ message: loginError })
        return
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '24h' },
      )

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  },
)

module.exports = router