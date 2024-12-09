import { test as setup, expect } from '@playwright/test'
import path from 'path'

const adminFile = path.join(__dirname, '../playwright/.auth/admin.json')

setup('authenticate as admin', async ({ page }) => {
  const username: string =  process.env.ADMIN_USERNAME || 'admin'
  const password: string = process.env.ADMIN_PASSWORD || 'Pass@123'
  await page.goto('/login')
  await page.getByPlaceholder('กรุณากรอกบัญชีผู้ใช้งานs').click()
  await page.getByPlaceholder('กรุณากรอกบัญชีผู้ใช้งานs').fill(username)
  await page.getByPlaceholder('กรุณากรอกรหัสผ่าน').click()
  await page.getByPlaceholder('กรุณากรอกรหัสผ่าน').fill(password)
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
  await page.waitForURL('/')
  await expect(page.getByRole('heading', { name: 'รายการสั่งผลิต' })).toBeVisible()
  await page.context().storageState({ path: adminFile })
})