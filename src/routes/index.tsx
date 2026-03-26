import { MyCarousel } from '@/components/MyCarousel';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <MyCarousel name="Popular right now" />
    </div>
  );
}
