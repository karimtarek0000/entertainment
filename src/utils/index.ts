export const markAsBookmark = (list: [], bookmarks: { id: string }[]) => {
  const finalBookmarks = new Set(bookmarks.map(item => item.id))

  return list.map((item: { id: string }) => {
    if (finalBookmarks.has(item.id)) return { ...item, isBookmarked: true }
    return item
  })
}
