interface EmptyStateProps {
  title?: string
}

const EmptyState = ({ title }: EmptyStateProps) => {
  return (
    <div className='flex justify-center items-center px-4 py-10 sm:px-6 lg:px-8 h-full bg-purple-4'>
      <h3 className='mt-2 text-2xl font-semibold text-gray-200'>{title}</h3>
    </div>
  )
}

export default EmptyState
