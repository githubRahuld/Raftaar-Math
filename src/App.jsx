import React, { useState, useEffect, useRef } from "react";
// Helmet import removed for preview stability
import "react-helmet";
import {
  BookOpen,
  Box,
  Grid3x3,
  Type,
  Calculator,
  Brain,
  Check,
  X as XIcon,
  RefreshCw,
  Trophy,
  Percent,
  Zap,
  Clock,
  Divide,
  TrendingUp,
  Target,
  ChevronRight,
  Timer,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

// --- Helper Functions ---

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// --- Sub-Components ---

const MultiplicationView = () => {
  const tables = Array.from({ length: 20 }, (_, i) => i + 11);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn'>
      {tables.map((num) => (
        <div
          key={num}
          className='bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-shadow duration-300'
        >
          <div className='bg-orange-600 text-white p-3 text-center font-bold text-lg'>
            Table of {num}
          </div>
          <div className='p-4 bg-orange-50/30'>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => (
              <div
                key={multiplier}
                className='flex justify-between items-center py-1.5 border-b border-orange-100 last:border-0 text-gray-700'
              >
                <span className='font-medium text-gray-500'>
                  {num} × {multiplier}
                </span>
                <span className='font-bold text-orange-700 text-lg'>
                  {num * multiplier}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const SquaresView = () => {
  const squares = Array.from({ length: 50 }, (_, i) => i + 1);
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden animate-fadeIn'>
      <div className='bg-emerald-600 p-4 text-white font-bold text-xl flex items-center gap-2'>
        <Grid3x3 size={24} /> Squares (1 to 50)
      </div>
      <div className='p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {squares.map((num) => (
          <div
            key={num}
            className='flex flex-col items-center p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-100'
          >
            <span className='text-xs font-semibold text-emerald-600 uppercase mb-1'>
              Square of {num}
            </span>
            <div className='flex items-baseline gap-1'>
              <span className='text-gray-400 text-sm'>{num}² =</span>
              <span className='text-2xl font-bold text-emerald-800'>
                {num * num}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CubesView = () => {
  const cubes = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden animate-fadeIn'>
      <div className='bg-purple-600 p-4 text-white font-bold text-xl flex items-center gap-2'>
        <Box size={24} /> Cubes (1 to 20)
      </div>
      <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {cubes.map((num) => (
          <div
            key={num}
            className='relative group p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-100 flex justify-between items-center'
          >
            <div className='flex flex-col'>
              <span className='text-purple-400 text-xs font-bold uppercase tracking-wider'>
                Number
              </span>
              <span className='text-2xl font-black text-purple-900/40 group-hover:text-purple-600 transition-colors'>
                {num}
              </span>
            </div>
            <div className='h-8 w-px bg-purple-200 mx-2'></div>
            <div className='flex flex-col items-end'>
              <span className='text-purple-400 text-xs font-bold uppercase tracking-wider'>
                Cube
              </span>
              <span className='text-3xl font-black text-purple-800'>
                {num * num * num}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FractionsView = () => {
  const denominators = Array.from({ length: 50 }, (_, i) => i + 1);
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden animate-fadeIn'>
      <div className='bg-teal-600 p-4 text-white font-bold text-xl flex items-center gap-2'>
        <Percent size={24} /> Fractions to Percentage
      </div>
      <div className='p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {denominators.map((denom) => {
          const val = 100 / denom;
          const displayVal = Number.isInteger(val) ? val : val.toFixed(2);
          return (
            <div
              key={denom}
              className='flex flex-col items-center p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-100'
            >
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-lg font-bold text-gray-500'>
                  1/{denom}
                </span>
                <span className='text-teal-300'>=</span>
              </div>
              <div className='text-xl font-black text-teal-700'>
                {displayVal}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AlphabetView = () => {
  const alphabets = Array.from({ length: 26 }, (_, i) => ({
    char: String.fromCharCode(65 + i),
    val: i + 1,
  }));
  return (
    <div className='space-y-6 animate-fadeIn'>
      <div className='bg-white rounded-2xl shadow-lg border border-rose-100 p-6'>
        <div className='flex items-center gap-2 mb-6 border-b border-rose-100 pb-4'>
          <div className='bg-rose-100 p-2 rounded-lg text-rose-600'>
            <Type size={24} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>
            English Alphabet Values
          </h2>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3'>
          {alphabets.map(({ char, val }) => (
            <div
              key={char}
              className='flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-white to-rose-50 border border-rose-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
            >
              <span className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-500 to-orange-500 mb-1'>
                {char}
              </span>
              <span className='text-sm font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100'>
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-white rounded-2xl shadow-lg border border-orange-100 p-6 opacity-90'>
        <h3 className='text-lg font-bold text-gray-700 mb-4 flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-orange-500'></span> Reverse
          Pairs (Opposite Letters)
        </h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3'>
          {alphabets.map(({ char }) => {
            const reverseChar = String.fromCharCode(155 - char.charCodeAt(0));
            return (
              <div
                key={char}
                className='flex items-center justify-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 shadow-sm'
              >
                <div className='font-bold text-xl text-gray-700'>{char}</div>
                <div className='text-orange-400 font-medium'>↔</div>
                <div className='font-bold text-xl text-orange-600'>
                  {reverseChar}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const VedicTricksView = () => {
  const tricks = [
    {
      title: "Multiply by 11",
      desc: "Separate the digits and add them in the middle.",
      example: "23 × 11 -> 2 | (2+3) | 3 = 253",
    },
    {
      title: "Square ending in 5",
      desc: "Multiply the first digit by (itself + 1), then append 25.",
      example: "35² -> 3×4 | 25 = 1225",
    },
    {
      title: "Multiply by 5",
      desc: "Halve the number and multiply by 10.",
      example: "48 × 5 -> 24 × 10 = 240",
    },
    {
      title: "Multiply by 9",
      desc: "Multiply by 10 and subtract the number.",
      example: "14 × 9 -> 140 - 14 = 126",
    },
    {
      title: "Square of 40-60",
      desc: "Distance from 50 (d). First part: 25 ± d. Second part: d².",
      example: "46² (-4) -> 25-4 | 4² = 2116",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn'>
      {tricks.map((trick, i) => (
        <div
          key={i}
          className='bg-white rounded-xl shadow-md border border-indigo-100 p-6 hover:shadow-lg transition-all'
        >
          <h3 className='text-lg font-bold text-indigo-700 mb-2'>
            {trick.title}
          </h3>
          <p className='text-gray-600 mb-4 text-sm'>{trick.desc}</p>
          <div className='bg-indigo-50 p-3 rounded-lg text-indigo-900 font-mono text-sm border border-indigo-200'>
            Eg: {trick.example}
          </div>
        </div>
      ))}
    </div>
  );
};

const SimplificationView = () => {
  const [problem, setProblem] = useState(null);
  const [ans, setAns] = useState("");
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0);

  const generateSimp = () => {
    // Generate format: A * B + C or A * B - C
    const a = getRandomInt(2, 20);
    const b = getRandomInt(2, 10);
    const c = getRandomInt(10, 100);
    const op = Math.random() > 0.5 ? "+" : "-";

    return {
      text: `${a} × ${b} ${op} ${c}`,
      val: op === "+" ? a * b + c : a * b - c,
    };
  };

  useEffect(() => {
    setProblem(generateSimp());
  }, []);

  const check = (e) => {
    e.preventDefault();
    if (parseInt(ans) === problem.val) {
      setFeedback("Correct!");
      setStreak((s) => s + 1);
      setTimeout(() => {
        setProblem(generateSimp());
        setAns("");
        setFeedback("");
      }, 800);
    } else {
      setFeedback("Wrong! Try again.");
      setStreak(0);
    }
  };

  return (
    <div className='max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center animate-fadeIn'>
      <div className='flex items-center justify-center gap-2 mb-6'>
        <Divide className='text-blue-500' size={28} />
        <h2 className='text-2xl font-bold text-gray-800'>
          Simplification Drill
        </h2>
      </div>
      <div className='mb-8'>
        <div className='text-gray-500 text-sm font-bold uppercase tracking-wider mb-2'>
          Solve using BODMAS
        </div>
        <div className='text-5xl font-black text-blue-600'>{problem?.text}</div>
      </div>
      <form onSubmit={check} className='flex flex-col gap-4 max-w-xs mx-auto'>
        <input
          type='number'
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          placeholder='?'
          className='text-center text-2xl p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none'
          autoFocus
        />
        <button
          type='submit'
          className='bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors'
        >
          Check Answer
        </button>
      </form>
      <div
        className={`mt-4 h-6 font-bold ${
          feedback.includes("Correct") ? "text-green-500" : "text-red-500"
        }`}
      >
        {feedback}
      </div>
      <div className='mt-2 text-gray-400 text-sm'>Streak: {streak}</div>
    </div>
  );
};

const QuadraticView = () => {
  const [eq, setEq] = useState(null);
  const [status, setStatus] = useState(null); // correct/wrong

  const generateQuad = () => {
    // Generate roots to ensure integers
    const r1 = getRandomInt(-10, 10);
    const r2 = getRandomInt(-10, 10);
    const r3 = getRandomInt(-10, 10);
    const r4 = getRandomInt(-10, 10);

    // Form eq: x^2 - (sum)x + prod = 0
    const eq1 = { a: 1, b: -(r1 + r2), c: r1 * r2, r1, r2 };
    const eq2 = { a: 1, b: -(r3 + r4), c: r3 * r4, r1: r3, r2: r4 };

    // Determine relation
    let rel = "CND";
    const xvals = [r1, r2];
    const yvals = [r3, r4];

    let gt = 0,
      lt = 0,
      eqCount = 0;
    for (let x of xvals) {
      for (let y of yvals) {
        if (x > y) gt++;
        else if (x < y) lt++;
        else eqCount++;
      }
    }

    if (gt > 0 && lt === 0) rel = eqCount > 0 ? "x >= y" : "x > y";
    else if (lt > 0 && gt === 0) rel = eqCount > 0 ? "x <= y" : "x < y";
    else if (lt === 0 && gt === 0) rel = "x = y";
    else rel = "CND";

    return { eq1, eq2, rel };
  };

  useEffect(() => {
    setEq(generateQuad());
  }, []);

  const handleAns = (selected) => {
    if (selected === eq.rel) {
      setStatus("Correct!");
      setTimeout(() => {
        setEq(generateQuad());
        setStatus(null);
      }, 1000);
    } else {
      setStatus("Wrong!");
    }
  };

  const formatEq = (c) =>
    `x² ${c.b >= 0 ? "+" : ""}${c.b}x ${c.c >= 0 ? "+" : ""}${c.c} = 0`;
  const formatEqY = (c) =>
    `y² ${c.b >= 0 ? "+" : ""}${c.b}y ${c.c >= 0 ? "+" : ""}${c.c} = 0`;

  return (
    <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-purple-100 p-8 text-center animate-fadeIn'>
      <div className='flex items-center justify-center gap-2 mb-6'>
        <Target className='text-purple-500' size={28} />
        <h2 className='text-2xl font-bold text-gray-800'>
          Quadratic Inequalities
        </h2>
      </div>
      {eq && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          <div className='bg-purple-50 p-6 rounded-xl'>
            <div className='text-purple-400 text-xs font-bold uppercase mb-2'>
              Equation I
            </div>
            <div className='text-xl font-bold text-gray-700'>
              {formatEq(eq.eq1)}
            </div>
          </div>
          <div className='bg-purple-50 p-6 rounded-xl'>
            <div className='text-purple-400 text-xs font-bold uppercase mb-2'>
              Equation II
            </div>
            <div className='text-xl font-bold text-gray-700'>
              {formatEqY(eq.eq2)}
            </div>
          </div>
        </div>
      )}
      <div className='grid grid-cols-3 gap-3'>
        {["x > y", "x < y", "x >= y", "x <= y", "x = y", "CND"].map((opt) => (
          <button
            key={opt}
            onClick={() => handleAns(opt)}
            className='bg-white border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 font-bold py-3 rounded-lg transition-all'
          >
            {opt}
          </button>
        ))}
      </div>
      <div
        className={`mt-4 h-6 font-bold ${
          status === "Correct!" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </div>
    </div>
  );
};

const NumberSeriesView = () => {
  const [series, setSeries] = useState(null);
  const [ans, setAns] = useState("");
  const [msg, setMsg] = useState("");

  const generateSeries = () => {
    const start = getRandomInt(2, 20);
    const diff = getRandomInt(2, 10);
    const type = Math.random(); // 0: AP, 1: GP, 2: Squares
    let arr = [];

    if (type < 0.4) {
      // AP
      arr = [
        start,
        start + diff,
        start + diff * 2,
        start + diff * 3,
        start + diff * 4,
      ];
    } else if (type < 0.7) {
      // Squares diff
      arr = [start, start + 1, start + 5, start + 14, start + 30]; // +1, +4, +9, +16
    } else {
      // Multiplier
      const m = getRandomInt(2, 4);
      arr = [
        start,
        start * m,
        start * m * m,
        start * m * m * m,
        start * m * m * m * m,
      ];
    }
    return { nums: arr.slice(0, 4), ans: arr[4] };
  };

  useEffect(() => {
    setSeries(generateSeries());
  }, []);

  const check = (e) => {
    e.preventDefault();
    if (parseInt(ans) === series.ans) {
      setMsg("Correct!");
      setTimeout(() => {
        setSeries(generateSeries());
        setAns("");
        setMsg("");
      }, 1000);
    } else {
      setMsg("Wrong");
    }
  };

  return (
    <div className='max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-teal-100 p-8 text-center animate-fadeIn'>
      <div className='flex items-center justify-center gap-2 mb-6'>
        <TrendingUp className='text-teal-500' size={28} />
        <h2 className='text-2xl font-bold text-gray-800'>Find Next Number</h2>
      </div>
      <div className='flex justify-center gap-4 mb-8 text-2xl font-bold text-gray-700'>
        {series?.nums.map((n, i) => (
          <span key={i} className='bg-gray-100 px-3 py-1 rounded-md'>
            {n}
          </span>
        ))}
        <span className='bg-teal-100 text-teal-600 px-3 py-1 rounded-md'>
          ?
        </span>
      </div>
      <form onSubmit={check}>
        <input
          type='number'
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          className='w-32 text-center text-xl p-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 outline-none mb-4'
        />
        <div
          className={`h-6 font-bold ${
            msg === "Correct!" ? "text-green-500" : "text-red-500"
          }`}
        >
          {msg}
        </div>
      </form>
    </div>
  );
};

const SprintView = () => {
  const [gameState, setGameState] = useState("menu"); // menu, playing, end
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(null);
  const [ans, setAns] = useState("");

  const genQ = () => {
    const a = getRandomInt(2, 99);
    const b = getRandomInt(2, 99);
    const op = Math.random() > 0.5 ? "+" : "-";
    return { text: `${a} ${op} ${b}`, val: op === "+" ? a + b : a - b };
  };

  useEffect(() => {
    let timer;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setGameState("end");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setQ(genQ());
    setGameState("playing");
    setAns("");
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (parseInt(ans) === q.val) {
      setScore((s) => s + 1);
      setQ(genQ());
      setAns("");
    }
  };

  return (
    <div className='max-w-xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-red-100 p-8 text-center animate-fadeIn overflow-hidden relative'>
      <div className='absolute top-0 left-0 w-full h-2 bg-red-100'>
        <div
          className='h-full bg-red-500 transition-all duration-1000'
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        ></div>
      </div>

      <div className='flex items-center justify-center gap-2 mb-8 mt-4'>
        <Zap className='text-red-500' size={32} fill='currentColor' />
        <h2 className='text-3xl font-black text-gray-800 uppercase italic'>
          Sprint Mode
        </h2>
      </div>

      {gameState === "menu" && (
        <div>
          <p className='text-gray-600 mb-6'>
            60 Seconds. Simple Math. How fast are you?
          </p>
          <button
            onClick={startGame}
            className='bg-red-600 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all'
          >
            START SPRINT
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div className='flex justify-between items-center mb-8 px-4'>
            <div className='text-2xl font-bold text-gray-400'>
              Time: <span className='text-red-600'>{timeLeft}</span>
            </div>
            <div className='text-2xl font-bold text-gray-400'>
              Score: <span className='text-green-600'>{score}</span>
            </div>
          </div>
          <div className='text-6xl font-black text-gray-800 mb-8'>{q.text}</div>
          <form onSubmit={handleInput}>
            <input
              type='number'
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              className='w-full text-center text-4xl p-4 border-b-4 border-red-200 focus:border-red-600 outline-none bg-transparent'
              autoFocus
            />
          </form>
        </div>
      )}

      {gameState === "end" && (
        <div>
          <h3 className='text-2xl font-bold text-gray-600 mb-2'>Time's Up!</h3>
          <div className='text-6xl font-black text-red-600 mb-6'>{score}</div>
          <p className='text-gray-500 mb-8'>Questions Solved</p>
          <button
            onClick={startGame}
            className='bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition-all flex items-center gap-2 mx-auto'
          >
            <RotateCcw size={20} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

const RaftaarMathApp = () => {
  const [activeTab, setActiveTab] = useState("tables");

  // Global Timer State
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTime, setTimerTime] = useState(1200); // 20 mins default

  useEffect(() => {
    let interval;
    if (timerActive && timerTime > 0) {
      interval = setInterval(() => setTimerTime((t) => t - 1), 1000);
    } else if (timerTime === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerTime]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const navItems = [
    {
      id: "tables",
      label: "Tables",
      icon: Calculator,
      color: "text-orange-600",
    },
    {
      id: "squares",
      label: "Squares",
      icon: Grid3x3,
      color: "text-emerald-600",
    },
    { id: "cubes", label: "Cubes", icon: Box, color: "text-purple-600" },
    {
      id: "fractions",
      label: "Fractions",
      icon: Percent,
      color: "text-teal-600",
    },
    {
      id: "alphabets",
      label: "Alphabets",
      icon: Type,
      color: "text-rose-600",
    },
    {
      id: "tricks",
      label: "Tricks",
      icon: BookOpen,
      color: "text-indigo-600",
    },
    {
      id: "simplification",
      label: "Simp.",
      icon: Divide,
      color: "text-blue-600",
    },
    { id: "quadratic", label: "Quad.", icon: Target, color: "text-purple-600" },
    {
      id: "series",
      label: "Series",
      icon: TrendingUp,
      color: "text-teal-600",
    },
    { id: "sprint", label: "Sprint", icon: Zap, color: "text-red-600" },
  ];

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-100 pb-20'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center gap-3'>
              <div className='bg-orange-600 p-2 rounded-lg text-white shadow-lg shadow-orange-200'>
                <Zap size={24} fill='currentColor' />
              </div>
              <h1 className='text-2xl font-black italic tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-500 hidden sm:block'>
                RAFTAAR MATH
              </h1>
              <span className='sm:hidden font-black italic text-orange-700 text-xl'>
                RAFTAAR
              </span>
            </div>

            {/* Global Timer Toggle */}
            <button
              onClick={() => setTimerOpen(!timerOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold transition-all ${
                timerActive
                  ? "bg-red-50 text-red-600 border border-red-100 animate-pulse"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              <Clock size={16} />
              <span className='font-mono text-lg'>{formatTime(timerTime)}</span>
            </button>
          </div>
        </div>

        {/* Timer Control Panel (Dropdown) */}
        {timerOpen && (
          <div className='absolute right-4 top-16 bg-white shadow-xl border border-gray-200 p-4 rounded-xl z-50 w-72 animate-fadeIn'>
            <div className='text-xs font-bold text-gray-400 uppercase mb-2'>
              Exam Timer
            </div>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-4xl font-mono font-black text-gray-800 tracking-tight'>
                {formatTime(timerTime)}
              </span>
            </div>

            {/* Duration Presets */}
            <div className='grid grid-cols-3 gap-2 mb-4'>
              {[5, 10, 15, 20, 25, 30].map((min) => (
                <button
                  key={min}
                  onClick={() => {
                    setTimerActive(false);
                    setTimerTime(min * 60);
                  }}
                  className='px-2 py-1 text-xs font-bold bg-gray-50 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-md border border-gray-200'
                >
                  {min}m
                </button>
              ))}
            </div>

            <div className='flex gap-2'>
              <button
                onClick={() => setTimerActive(!timerActive)}
                className={`flex-1 py-3 rounded-xl font-bold text-white flex justify-center items-center shadow-md transition-all ${
                  timerActive
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {timerActive ? (
                  <>
                    <Pause size={18} className='mr-2' /> Pause
                  </>
                ) : (
                  <>
                    <Play size={18} className='mr-2' /> Start
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setTimerActive(false);
                  setTimerTime(1200);
                }}
                className='px-4 py-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors'
                title='Reset to 20m'
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar'>
          <div className='flex space-x-1 border-b border-gray-200'>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex flex-col items-center justify-center min-w-[4.5rem] py-3 px-1 border-b-2 transition-all duration-200 outline-none
                    ${
                      isActive
                        ? "border-orange-600 bg-orange-50/50"
                        : "border-transparent hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`mb-1 ${
                      isActive ? item.color : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      isActive ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40 sm:pt-44'>
        {activeTab === "tables" && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Multiplication Tables
              </h2>
              <span className='text-sm text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full hidden sm:inline-block'>
                Basic Speed
              </span>
            </div>
            <MultiplicationView />
          </div>
        )}

        {activeTab === "squares" && (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Perfect Squares
            </h2>
            <SquaresView />
          </div>
        )}
        {activeTab === "cubes" && (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>Perfect Cubes</h2>
            <CubesView />
          </div>
        )}
        {activeTab === "fractions" && (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Fraction to Percentage
            </h2>
            <FractionsView />
          </div>
        )}
        {activeTab === "alphabets" && (
          <div className='space-y-4'>
            <AlphabetView />
          </div>
        )}

        {/* NEW TABS */}
        {activeTab === "tricks" && (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Vedic Maths Tricks
            </h2>
            <VedicTricksView />
          </div>
        )}
        {activeTab === "simplification" && <SimplificationView />}
        {activeTab === "quadratic" && <QuadraticView />}
        {activeTab === "series" && <NumberSeriesView />}
        {activeTab === "sprint" && <SprintView />}
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RaftaarMathApp;
