import { toggleBookmarksForUser } from '@/actions/user'
import toast from 'react-hot-toast'

export const updateBookmarkStatus = async (
  data: CardWrapperData,
  isBookmarked: boolean,
  pathname: string,
) => {
  try {
    await toggleBookmarksForUser(data, pathname === '/dashboard/bookmarks')
    toast.success(
      `Successfully ${isBookmarked ? 'removed' : 'added'} bookmark - ${
        data.type
      }`,
    )
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('An unexpected error occurred')
    }
  }
}
