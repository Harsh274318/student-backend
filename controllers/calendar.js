// cron/generateCalendar.js
import cron from 'node-cron'
import moment from 'moment-timezone'
import MonthCalendar from '../models/ERP/MonthCalendar.js'
import SchoolConfig from '../models/ERP/schoolConfig.js'

const TZ = 'Asia/Kolkata'

function generateMonthCalendar(year, month) {
    const days = []
    const totalDays = moment.tz({ year, month: month - 1, day: 1 }, TZ)
        .daysInMonth()

    for (let d = 1; d <= totalDays; d++) {
        const date = moment.tz({ year, month: month - 1, day: d }, TZ)
        const weekNum = date.day()  // 0=Sun, 6=Sat
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekNum]
        const type = weekNum === 0 ? "sunday" : "working"

        days.push({
            dateOfDay: d,
            weekday,
            type,
            holidayName: null,
            isWorking: weekNum !== 0,
        })
    }

    return {
        year,
        month,
        workingDays: days.filter(d => d.isWorking).length,
        days,
        holidays: [],
        generatedAt: moment.tz(TZ).toDate(),  // IST time save hoga
    }
}

// ─── Cron job ────────────────────────────────────────────
// IST 01:00 AM — Singapore server pe bhi sahi chalega
cron.schedule('0 1 1 * *', async () => {
    try {
        console.log('Calendar cron started...')

        // new Date() nahi — moment IST use karega
        const now = moment.tz(TZ)
        const year = now.year()
        const month = now.month() + 1  // moment 0-based hai

        const calendar = generateMonthCalendar(year, month)

        await MonthCalendar.findOneAndUpdate(
            { year, month },
            calendar,
            { upsert: true, new: true }
        )

        console.log(`Calendar generated — ${month}/${year} | Working days: ${calendar.workingDays}`)

    } catch (err) {
        console.error('Calendar cron failed:', err.message)
    }
}, {
    timezone: 'Asia/Kolkata'  //  node-cron ko bhi batao IST mein chalao
})

// ─── Server start pe current month generate karo ─────────
export async function generateCurrentMonth() {
    try {
        const now = moment.tz(TZ)
        const year = now.year()
        const month = now.month() + 1

        const exists = await MonthCalendar.findOne({ year, month })
        if (exists) {
            console.log(`Calendar already exists for ${month}/${year}`)
            return
        }

        const calendar = generateMonthCalendar(year, month)
        await MonthCalendar.create(calendar)
        console.log(`Current month calendar created — ${month}/${year}`)

    } catch (err) {
        console.error('Manual calendar generation failed:', err.message)
    }
}

generateCurrentMonth()

export default generateMonthCalendar