// ในไฟล์ที่ต้องการทดสอบ
import { supabase } from './lib/supabase'

async function checkConnection() {
  const { error } = await supabase.auth.getSession()
  if (error) {
    console.error('ไม่สามารถเชื่อมต่อกับ Supabase:', error.message)
  } else {
    console.log('เชื่อมต่อกับ Supabase สำเร็จ')
  }
}

checkConnection()