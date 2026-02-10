
import NeteaseCloudMusicApi from 'NeteaseCloudMusicApi'

async function testUserRecord() {
  try {
    // 随便找个 UID，例如网易云官方账号或者热门用户
    // 比如罗大佑 uid=282662 (仅作示例)
    // 或者用户之前提供的歌单创建者 ID? 
    // 之前歌单ID 17747589549
    
    // 尝试调用 user_record
    const res = await NeteaseCloudMusicApi.user_record({
      uid: '32953014', // 随便填一个存在的 ID
      type: '1' // 1: 最近一周, 0: 所有时间
    })
    
    console.log('Status:', res.status)
    console.log('Body code:', res.body.code)
    if (res.body.code !== 200) {
      console.log('Message:', res.body.message || res.body.msg)
    } else {
      console.log('Success! Data length:', (res.body.weekData || []).length)
    }
  } catch (e) {
    console.error('Error:', e)
  }
}

testUserRecord();
