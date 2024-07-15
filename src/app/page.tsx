import TaskPage from "./tasks/page";

const Home = () => {
  return (
    <main className="flex-1 max-w-3xl md:max-w-4xl md:mx-auto">
      <section className="md:container px-3 relative">
        <div className="mx-auto py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
          <TaskPage />
        </div>
      </section>
    </main>
  );
};
export default Home;
