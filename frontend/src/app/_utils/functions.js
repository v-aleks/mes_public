export function getStatusName (status) {
    switch (status) {
        case 'planned':
            return 'Запланировано'
        case 'assigned':
            return 'На сборке'
        case 'done':
            return 'Собрано'
        case 'on_review':
            return 'Отправлено'
        case 'confirmed':
            return 'Подтверждено'
        case 'denied':
            return 'Не подтверждено'
        default:
            return 'Ошибка'
    }
    
}

export function getChartReport(date = new Date()) {
    const apiURL = `***`;
    
    return apiURL
}

export function getTableReport(date = new Date()) {
        const apiURL = `***`;    

        return apiURL
}