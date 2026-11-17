function formatAuthorDates(datesString) {
  return datesString
    .split(/,\s*|\s*&\s*/)
    .map((entry) => entry.trim())
    .filter((entry) => entry !== '')
    .filter((entry) => !/^\d{4}(\s*-\s*)?$/.test(entry))
}

export default formatAuthorDates
