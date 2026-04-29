import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// GET /api/collaborations - List all collaboration listings
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Filters
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const isRemote = searchParams.get('isRemote')
    const isNSFW = searchParams.get('isNSFW')
    const minFollowers = searchParams.get('minFollowers')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {
      isActive: true,
      status: 'active',
    }
    
    if (category) {
      where.collaborationType = {
        has: category
      }
    }
    
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }
    
    if (isRemote !== null) {
      where.isRemote = isRemote === 'true'
    }
    
    if (isNSFW !== null) {
      where.isNSFW = isNSFW === 'true'
    }
    
    if (minFollowers) {
      where.creator = {
        creatorProfile: {
          followerCount: {
            gte: parseInt(minFollowers)
          }
        }
      }
    }
    
    // Build orderBy
    let orderBy: any = { createdAt: 'desc' }
    switch (sortBy) {
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'popular':
        orderBy = { viewCount: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
    }
    
    // Fetch listings
    const [listings, total] = await Promise.all([
      prisma.collaborationListing.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
              isVerified: true,
              creatorProfile: {
                select: {
                  followerCount: true,
                  subscriberCount: true,
                  isNSFW: true,
                }
              }
            }
          },
          _count: {
            select: {
              applications: true
            }
          }
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.collaborationListing.count({ where })
    ])
    
    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Error fetching collaborations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collaborations' },
      { status: 500 }
    )
  }
}

// POST /api/collaborations - Create new collaboration listing
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Verify user is a creator
    const creator = await prisma.creatorProfile.findUnique({
      where: { userId: session.user.id }
    })
    
    if (!creator) {
      return NextResponse.json({ error: 'Must be a creator' }, { status: 403 })
    }
    
    const body = await req.json()
    
    // Validate required fields
    const required = ['title', 'description', 'price', 'collaborationType']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Create listing
    const listing = await prisma.collaborationListing.create({
      data: {
        creatorId: session.user.id,
        title: body.title,
        description: body.description,
        collaborationType: body.collaborationType,
        price: parseFloat(body.price),
        priceType: body.priceType || 'fixed',
        duration: body.duration ? parseInt(body.duration) : null,
        deliverables: body.deliverables || [],
        requirements: body.requirements,
        minFollowerCount: body.minFollowerCount ? parseInt(body.minFollowerCount) : 0,
        isNSFW: body.isNSFW || false,
        location: body.location,
        isRemote: body.isRemote !== false,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            isVerified: true,
          }
        }
      }
    })
    
    return NextResponse.json({
      success: true,
      listing
    })
    
  } catch (error) {
    console.error('Error creating collaboration:', error)
    return NextResponse.json(
      { error: 'Failed to create collaboration' },
      { status: 500 }
    )
  }
}
