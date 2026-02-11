import type { BlogPost } from '@/types/blog';
import { photographerInfo } from './photographer';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Finding Light in the Desert: A Photographer\'s Journey Through the Southwest',
    slug: 'finding-light-desert-southwest',
    excerpt: 'The desert teaches patience. After weeks spent chasing golden hour across Arizona and Utah, I learned that the best photographs come when you stop searching and start seeing.',
    content: `The desert teaches patience. After weeks spent chasing golden hour across Arizona and Utah, I learned that the best photographs come when you stop searching and start seeing.

## The Pull of the Desert

There's something about the American Southwest that calls to photographers. Maybe it's the way light behaves differently here — bouncing off sandstone walls, filtering through slot canyons, painting entire landscapes in colors that seem impossible until you see them with your own eyes.

I arrived in Page, Arizona with a shot list and a timeline. I left three weeks later with neither, but with images that meant more to me than anything I'd planned.

## Embracing the Unexpected

The best shot from the entire trip came on a day I almost didn't go out. Storm clouds had rolled in overnight, and my instinct was to wait for "better" conditions. But something pulled me to the canyon rim at dawn, and what I found there — shafts of light breaking through thunderheads, illuminating the red rock below — became the centerpiece of the entire Desert Solitude series.

## Lessons from the Land

Working in extreme environments strips away the excess. You can't carry everything, so you learn what matters. You can't control the light, so you learn to respond to it. You can't rush the desert, so you learn to breathe.

These lessons have fundamentally changed how I approach every shoot since. The desert didn't just give me images — it gave me a new way of seeing.

## Gear Notes

For this trip, I relied heavily on the Hasselblad X2D 100C with the XCD 21mm and 90mm lenses. The medium format sensor captures the subtle tonal gradations in desert light beautifully. I also brought a lightweight carbon fiber tripod — essential for the long exposures at dawn and dusk.`,
    coverImage: 'https://images.unsplash.com/photo-1610142004358-e4e987e4c5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjF8&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'travel',
    tags: ['desert', 'landscape', 'southwest', 'golden hour'],
    publishedAt: '2024-11-15',
    readingTime: '6 min read',
    author: { name: photographerInfo.name, avatar: photographerInfo.portraitImage },
  },
  {
    id: '2',
    title: 'The Art of Street Portraiture: Connecting with Strangers',
    slug: 'art-of-street-portraiture',
    excerpt: 'Every face tells a story. The challenge isn\'t technical — it\'s human. How do you earn someone\'s trust in sixty seconds and create a portrait that honors who they are?',
    content: `Every face tells a story. The challenge isn't technical — it's human. How do you earn someone's trust in sixty seconds and create a portrait that honors who they are?

## Beyond the Candid

There's a popular school of thought that street photography should be invisible — that the photographer should never interact with their subject. I respect that tradition, but my approach is different.

I believe the most powerful street portraits come from connection. A brief conversation. An exchange of names. A moment of genuine human contact that transforms a stranger into a collaborator.

## The Approach

My process is simple but not easy. I walk, I observe, I wait for someone whose presence speaks to me. Then I approach with honesty: "I'm a photographer, I love the way the light is falling on you right now, would you mind if I took your portrait?"

Most people say yes. The ones who say no teach me something too.

## Technical Simplicity

For street portraiture, I keep my setup minimal. A Canon EOS R5 with a 50mm f/1.2 lens. No reflectors, no flash, no assistants. Just available light and the geography of the city.

This simplicity isn't a limitation — it's a liberation. When you're not fussing with equipment, you're free to be present with your subject.

## The New York Series

The Urban Portraits series came together over six months of walking New York's neighborhoods. From the Bronx to Brighton Beach, from Harlem to the Lower East Side, each portrait is a tiny window into a life I was privileged to glimpse.`,
    coverImage: 'https://images.unsplash.com/photo-1559123988-ebd5228736b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjJ8&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'photography',
    tags: ['portraits', 'street photography', 'new york', 'people'],
    publishedAt: '2024-10-22',
    readingTime: '5 min read',
    author: { name: photographerInfo.name, avatar: photographerInfo.portraitImage },
  },
  {
    id: '3',
    title: 'Why I Switched to Medium Format (And Why You Might Not Need To)',
    slug: 'switched-to-medium-format',
    excerpt: 'After fifteen years shooting full frame, I made the leap to the Hasselblad X2D. Here\'s what changed, what didn\'t, and who actually benefits from medium format in 2024.',
    content: `After fifteen years shooting full frame, I made the leap to the Hasselblad X2D. Here's what changed, what didn't, and who actually benefits from medium format in 2024.

## The Honest Truth

Let me start with the part most gear reviewers skip: for 90% of photographers, medium format is unnecessary. Your full-frame camera is more than capable of producing stunning, professional-quality images. If you're thinking about switching because you feel limited, the limitation is almost certainly not your sensor size.

Now that we've got that out of the way, let me tell you why I switched anyway.

## What Actually Changed

The difference isn't resolution — though 100 megapixels certainly doesn't hurt. The real difference is in the rendering. There's a quality to medium format images that's difficult to articulate but immediately visible. The tonal transitions are smoother. The depth falloff is more gradual. Colors feel more... organic.

For my landscape and architectural work, this made a meaningful difference. For editorial portraits, honestly, the Canon R5 was equally capable.

## The Downsides

Weight. Cost. Slower autofocus. Limited lens selection. These are real trade-offs, not minor inconveniences. The X2D system weighs nearly twice what my Canon kit did, and the lenses cost accordingly.

## My Recommendation

If you print large, if tonal quality is paramount to your work, and if you can afford the investment without financial stress — medium format is remarkable. For everyone else, invest in lenses, lighting, and education instead. Those will improve your photography far more than any sensor upgrade.`,
    coverImage: 'https://images.unsplash.com/photo-1690927324729-bcf7d2b3ecac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjV8&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'gear',
    tags: ['hasselblad', 'medium format', 'gear review', 'camera'],
    publishedAt: '2024-09-08',
    readingTime: '7 min read',
    author: { name: photographerInfo.name, avatar: photographerInfo.portraitImage },
  },
  {
    id: '4',
    title: 'Mastering Natural Light: A Practical Guide for Any Setting',
    slug: 'mastering-natural-light',
    excerpt: 'Forget complex lighting setups. The most beautiful light is free and available everywhere — you just need to know where to look and when to shoot.',
    content: `Forget complex lighting setups. The most beautiful light is free and available everywhere — you just need to know where to look and when to shoot.

## The Golden Hours Are Just the Beginning

Yes, the hour after sunrise and before sunset produces gorgeous, warm directional light. Every photographer knows this. But if you're only shooting during golden hour, you're missing the vast majority of beautiful light that exists throughout the day.

## Overcast Days Are Your Friend

Cloud cover is nature's softbox. Overcast days produce even, diffused light that's incredibly flattering for portraits and eliminates harsh shadows in architectural work. Some of my favorite images were shot under gray skies.

## Finding Light Indoors

Window light is endlessly versatile. A single north-facing window produces soft, directional light that rivals any studio setup. Add a white wall opposite the window as a fill, and you have a two-light setup without spending a dollar.

## The Five-Minute Rule

When you arrive at any location, spend five minutes just observing the light before you touch your camera. Where is it coming from? What's it bouncing off? Where are the shadows falling? This simple practice will transform your images more than any technical upgrade.

## Exercises to Try

1. Photograph the same subject at four different times of day
2. Find beautiful light in a parking garage
3. Shoot a portrait using only light from a smartphone screen
4. Capture the shadow, not the object casting it

Light is the raw material of photography. Learn to see it, and everything else follows.`,
    coverImage: 'https://images.unsplash.com/photo-1619508126123-3586ee993858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzB8&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'tutorials',
    tags: ['lighting', 'natural light', 'tutorial', 'tips'],
    publishedAt: '2024-08-14',
    readingTime: '5 min read',
    author: { name: photographerInfo.name, avatar: photographerInfo.portraitImage },
  },
  {
    id: '5',
    title: 'A Year in the Mountains: Documenting Alpine Life',
    slug: 'year-in-the-mountains',
    excerpt: 'Living at 2,000 meters for twelve months changed everything — my photography, my priorities, and my understanding of what it means to truly document a place.',
    content: `Living at 2,000 meters for twelve months changed everything — my photography, my priorities, and my understanding of what it means to truly document a place.

## Why a Year?

Short trips produce tourist photographs. Even extended visits of weeks or months capture only surface impressions. I wanted to document the Swiss Alps as they actually are — not as a vacation destination but as a living, breathing place where people build lives, raise families, and face the reality of a changing climate.

## The Rhythm of the Mountains

Alpine life follows rhythms that are invisible to visitors. The cattle migrations in spring and fall. The preparation rituals before winter. The festivals that mark transitions between seasons. To understand these rhythms, you have to live inside them.

## Building Trust

The mountain communities I documented were initially wary of another photographer passing through. Trust came slowly — through shared meals, helping with practical tasks, showing up consistently without a camera. By the time I began seriously shooting, I wasn't a photographer anymore. I was a neighbor who happened to take pictures.

## The Images That Matter

The Mountain Stories series contains 127 final images, selected from over 40,000 frames. But the images I'm most proud of aren't the dramatic landscape shots. They're the quiet moments — a grandmother's hands kneading bread, children playing in summer meadows, the particular quality of light through a barn door at dawn.

## What I Learned

Documentation is not the same as photography. Photography captures moments. Documentation captures truth. The difference is time, trust, and the willingness to let the story tell itself.`,
    coverImage: 'https://images.unsplash.com/photo-1680287327539-9467451a8b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njh8&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'personal',
    tags: ['documentary', 'mountains', 'swiss alps', 'long-term project'],
    publishedAt: '2024-07-03',
    readingTime: '8 min read',
    author: { name: photographerInfo.name, avatar: photographerInfo.portraitImage },
  },
  {
    id: '6',
    title: 'Editing Philosophy: Less Is More',
    slug: 'editing-philosophy-less-is-more',
    excerpt: 'In an era of dramatic presets and heavy-handed processing, I\'ve found that the most powerful editing approach is restraint. Here\'s how I develop my images.',
    content: `In an era of dramatic presets and heavy-handed processing, I've found that the most powerful editing approach is restraint. Here's how I develop my images.

## The Problem with Presets

Presets aren't inherently bad. But they encourage a backward workflow — starting with an aesthetic and forcing your image to fit it, rather than letting the image tell you what it needs.

## My Process

Every image begins the same way: I look at the RAW file and ask, "What is this photograph trying to say?" The editing that follows serves that answer.

Usually, this means modest adjustments to exposure, contrast, and color temperature. Occasionally it means a dramatic crop or a shift to black and white. Rarely does it mean heavy saturation, split-toning, or trendy color grading.

## The Test

I apply a simple test to every editing decision: "Am I making this image more truthful, or more fashionable?" Both are valid goals, but for my work, truth wins.

## Practical Tips

1. **Edit on a calibrated monitor.** Everything else is guesswork.
2. **Step away before exporting.** Fresh eyes catch over-editing.
3. **Compare to the RAW.** If you can't immediately see an improvement, you've probably gone too far.
4. **Develop a consistent look, not a formula.** Your editing should be recognizable but not repetitive.

The best edit is the one you don't notice. When someone looks at your photograph and thinks about the subject, not the processing — that's when you've succeeded.`,
    coverImage: 'https://images.unsplash.com/photo-1582210413269-f0bf6d13f58f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzN8&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'tutorials',
    tags: ['editing', 'post-processing', 'workflow', 'philosophy'],
    publishedAt: '2024-06-19',
    readingTime: '5 min read',
    author: { name: photographerInfo.name, avatar: photographerInfo.portraitImage },
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

export const getRelatedPosts = (currentSlug: string, count: number = 2): BlogPost[] => {
  const current = blogPosts.find(p => p.slug === currentSlug);
  if (!current) return blogPosts.slice(0, count);
  return blogPosts
    .filter(p => p.slug !== currentSlug && p.category === current.category)
    .slice(0, count);
};
