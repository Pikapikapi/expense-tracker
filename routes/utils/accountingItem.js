function getCategoryInfo(searchItem) {
  switch (searchItem) {
    case 'home':
      return { categoryClass: 'fa-solid fa-house', itemName: '家居物業' }
    case 'transportation':
      return { categoryClass: 'fa-solid fa-van-shuttle', itemName: '交通出行' }
    case 'entertainment':
      return { categoryClass: 'fa-solid fa-face-grin-beam', itemName: '休閒娛樂' }
    case 'food':
      return { categoryClass: 'fa-solid fa-utensils', itemName: '餐飲食品' }
    case 'others':
      return { categoryClass: 'fa-solid fa-pen', itemName: '其他' }
    default:
      return { categoryClass: '', itemName: '' }
  }
}

function getCategoryOptions(selectedCategoryClass) {
  const categories = [
    { value: '家居物業', label: '家居物業', class: 'fa-solid fa-house' },
    { value: '交通出行', label: '交通出行', class: 'fa-solid fa-van-shuttle' },
    { value: '休閒娛樂', label: '休閒娛樂', class: 'fa-solid fa-face-grin-beam' },
    { value: '餐飲食品', label: '餐飲食品', class: 'fa-solid fa-utensils' },
    { value: '其他', label: '其他', class: 'fa-solid fa-pen' },
  ]

  return categories
    .map((category) => `<option value='${category.value}' ${category.class === selectedCategoryClass ? 'selected' : ''}>${category.label}</option>`)
    .join('')
}

module.exports = { getCategoryInfo, getCategoryOptions }
