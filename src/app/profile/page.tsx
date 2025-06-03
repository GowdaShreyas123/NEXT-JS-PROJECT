import Link from 'next/link';

export default function Example() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 px-4 sm:px-6 lg:px-8">
      <div className="text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 sm:p-8 max-w-xl sm:max-w-2xl w-full text-white">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Hi, this is Shreyas.M
        </h1>
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold">
          I am a full stack developer
        </p>

        {/* Back Button */}
        <Link
          href="/"
          className="mt-6 inline-block bg-purple-700 text-white font-medium py-2 px-5 sm:py-2.5 sm:px-6 rounded-full shadow hover:bg-purple-800 transition text-sm sm:text-base"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
