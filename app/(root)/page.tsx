import PodcastCard from '@/components/podcast-card'
import { podcastData } from '@/constants'

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

        <div className="podcast_grid">
          {podcastData.map(({ id, imgUrl, title, description }) => (
            <PodcastCard
              key={id}
              imgUrl={imgUrl}
              title={title}
              description={description}
              podcastId={id.toString()}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
