import moment from 'moment'
import React from 'react'

const FormatDate = (inputDate) => {
    return moment(inputDate).format('YYYY-MM-DD')
}

export default FormatDate