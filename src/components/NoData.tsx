import React from 'react'

interface NoDataProps {
  headerText: string
  bodyText: string
  buttonText: string
  url: string
}

export default function NoData({
  headerText,
  bodyText,
  buttonText,
  url,
}: NoDataProps) {
  const handleClick = () => {
    window.location.href = url
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">{headerText}</h1>
      <p className="mb-6 text-center max-w-sm">{bodyText}</p>
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        type="button"
      >
        {buttonText}
      </button>
    </div>
  )
}
