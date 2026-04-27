import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PostsPaginationProps {
  currentPage: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export default function PostsPagination({ currentPage, total, limit, onPageChange }: PostsPaginationProps) {
  const totalPages = Math.ceil(total / limit)
  
  if (totalPages <= 1) return null

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    onPageChange(page)
  }

  // Task 7: Implement windowed pagination with ellipsis
  const getPageNumbers = () => {
    const pages = []
    const window = 2 // Pages to show around current page
    
    // Always show first page
    pages.push(1)

    // Gap after first page
    if (currentPage > window + 2) {
      pages.push('ellipsis-start')
    }

    // Pages around current
    for (let i = Math.max(2, currentPage - window); i <= Math.min(totalPages - 1, currentPage + window); i++) {
      pages.push(i)
    }

    // Gap before last page
    if (currentPage < totalPages - window - 1) {
      pages.push('ellipsis-end')
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={handlePrevious}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {getPageNumbers().map((p, idx) => {
            if (p === 'ellipsis-start' || p === 'ellipsis-end') {
              return (
                <PaginationItem key={`${p}-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            const pageNum = p as number
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === pageNum}
                  onClick={(e) => handlePageClick(e, pageNum)}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={handleNext}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
