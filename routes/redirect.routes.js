// /api/redirect
const { Router } = require('express')

const Link = require('../models/Link')

const router = Router()

router.get('/:code', async (req, res) => {
    console.log(req)
    try {
      const { code } = req.params
      const link     = await Link.findOne({ code })

      if (!link) {
        return res.status(404).json({ message: 'Ссылка не найдена' })
      }

      link.views++
      link.save()
      res.redirect(link.to)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  },
)

module.exports = router