import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { DevAuthToggle } from '@/components/dev/DevAuthToggle'

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <DevAuthToggle />
    </>
  )
}
