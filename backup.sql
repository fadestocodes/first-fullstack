--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: drew
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'GUEST'
);


ALTER TYPE public."Role" OWNER TO drew;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blogpost; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public."Blogpost" (
    id integer NOT NULL,
    title text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content text NOT NULL,
    category text NOT NULL,
    "isPublished" boolean DEFAULT false NOT NULL,
    "coverPhoto" text NOT NULL,
    "lastUpdated" timestamp(3) without time zone,
    likes integer DEFAULT 0 NOT NULL,
    views integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Blogpost" OWNER TO drew;

--
-- Name: Blogpost_id_seq; Type: SEQUENCE; Schema: public; Owner: drew
--

CREATE SEQUENCE public."Blogpost_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Blogpost_id_seq" OWNER TO drew;

--
-- Name: Blogpost_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: drew
--

ALTER SEQUENCE public."Blogpost_id_seq" OWNED BY public."Blogpost".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "parentCommentId" integer,
    "blogId" integer,
    "postcardId" integer
);


ALTER TABLE public."Comment" OWNER TO drew;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: drew
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO drew;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: drew
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Postcard; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public."Postcard" (
    id integer NOT NULL,
    picture text NOT NULL,
    "countryCode" text NOT NULL,
    emoji text NOT NULL,
    "userId" integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    caption text NOT NULL,
    country text NOT NULL,
    location text NOT NULL
);


ALTER TABLE public."Postcard" OWNER TO drew;

--
-- Name: Postcard_id_seq; Type: SEQUENCE; Schema: public; Owner: drew
--

CREATE SEQUENCE public."Postcard_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Postcard_id_seq" OWNER TO drew;

--
-- Name: Postcard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: drew
--

ALTER SEQUENCE public."Postcard_id_seq" OWNED BY public."Postcard".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public."Session" (
    sid text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Session" OWNER TO drew;

--
-- Name: User; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    "googleId" text,
    role public."Role" DEFAULT 'GUEST'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    picture text,
    "facebookId" text,
    name text NOT NULL
);


ALTER TABLE public."User" OWNER TO drew;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: drew
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO drew;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: drew
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _UserBookmarks; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public."_UserBookmarks" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_UserBookmarks" OWNER TO drew;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: drew
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO drew;

--
-- Name: Blogpost id; Type: DEFAULT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Blogpost" ALTER COLUMN id SET DEFAULT nextval('public."Blogpost_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Postcard id; Type: DEFAULT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Postcard" ALTER COLUMN id SET DEFAULT nextval('public."Postcard_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Blogpost; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public."Blogpost" (id, title, "userId", "createdAt", content, category, "isPublished", "coverPhoto", "lastUpdated", likes, views) FROM stdin;
2	Ireland	1	2024-12-11 01:04:50.376	<h1 class="wp-block-heading">Best Day Trips from Rome</h1>\n<h3 class="wp-block-heading"><span id="tivoli" class="ez-toc-section"></span>Tivoli</h3>\n<p data-slot-rendered-content="true"><strong>Tivoli is my personal top recommendation for a day trip from Rome.</strong>&nbsp;It&rsquo;s a beautiful town home to two truly stupefying villas, and it&rsquo;s a short, convenient journey from Rome, either by train or as part of a&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome">guided tour</a>.</p>\n<p data-slot-rendered-content="true"><img class="entered lazyloaded" src="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg 1024w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-800x531.jpg 800w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-768x510.jpg 768w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1536x1020.jpg 1536w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-2048x1359.jpg 2048w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-150x100.jpg 150w" alt="A big, ornate outdoor fountain with an emerald green pool in front of it. People are walking around and taking pictures." width="807" height="536" data-lazy-srcset="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg 1024w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-800x531.jpg 800w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-768x510.jpg 768w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1536x1020.jpg 1536w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-2048x1359.jpg 2048w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-150x100.jpg 150w" data-lazy-sizes="(max-width: 1024px) 100vw, 1024px" data-lazy-src="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg" data-ll-status="loaded"></p>\n<p data-slot-rendered-content="true">&nbsp;</p>\n<p><strong>Best things to do in Tivoli:</strong>&nbsp;The main reason for visiting Tivoli are the two UNESCO World Heritage Sites, Villa d&rsquo;Este and Hadrian&rsquo;s Villa.&nbsp;Villa d&rsquo;Este is right in the center of Tivoli, while Hadrian&rsquo;s Villa is outside Tivoli in the countryside.</p>\n<p data-slot-rendered-content="true">Villa d&rsquo;Este is a 16th Century Italian Renaissance complex. While the interior features the most beautifully painted frescoes, I think the true highlight is the gardens. The gardens of Villa d&rsquo;Este are filled with ornate, unique fountains, each that differs from each other.</p>\n<p><strong>Should you book a tour or go independently:</strong>&nbsp;I recently visited independently, taking the train to Tivoli to visit Villa d&rsquo;Este. However, it was so tough to get to Hadrian&rsquo;s Villa &mdash; no Uber, no cabs, and infrequent buses &mdash; that we gave up and headed back to Rome.&nbsp;</p>\n<p>So if you want to see both Villa d&rsquo;Este and Hadrian&rsquo;s Villa in a single day, I recommend&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome" target="_blank" rel="noreferrer noopener nofollow">taking a tour</a>. But if you only want to see Villa d&rsquo;Este, you can get there pretty easily by train.</p>\n<p><strong>Book a tour to Tivoli:</strong>&nbsp;On this&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome" target="_blank" rel="noreferrer noopener nofollow">Tivoli Villas Full Day Trip From Rome</a>, you&rsquo;ll visit both Hadrian&rsquo;s Villa and Villa d&rsquo;Este with skip-the-line tours, plus time for lunch and a stroll in Tivoli.&nbsp;</p>\n<p data-slot-rendered-content="true"><strong>How to get from Rome to Tivoli independently:</strong> From Rome, you can take a direct train to Tivoli arriving in 30-60 minutes (depending on if you take an RV high-speed train or not). Once at the train station in Tivoli, cross the nearby bridge and Villa d&rsquo;Este is just a short walk away (10 minutes) while Hadrian&rsquo;s Villa is more than an hour&rsquo;s walk away (or a five-minute bus ride then 20-minute walk, if you can get a bus!).</p>	travel-tips	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/img20221116_12301441 2.jpg	2024-12-16 20:43:34.825	0	8
7	testtttt	2	2024-12-11 18:08:58.252	<p>Start writing your blog!</p>	travel-tips	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/img20221116_21475887 2.jpg	2024-12-16 20:29:59.278	0	2
5	dsfsdf	1	2024-12-11 17:41:27.318	<p>Start writing your blog!</p>	destination-guide	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/IMG_0256.jpg	2024-12-16 20:29:01.476	0	9
6	dsfsdfdsfsdf	2	2024-12-11 18:06:10.01	<p>Start writing your blog!</p>	food	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC09736.jpg	2024-12-16 20:24:24.059	0	7
3	Rome	1	2024-12-11 01:22:38.067	<h1 class="wp-block-heading">Best Day Trips from Rome</h1>\n<h3 class="wp-block-heading"><span id="tivoli" class="ez-toc-section"></span>Tivoli</h3>\n<p data-slot-rendered-content="true"><strong>Tivoli is my personal top recommendation for a day trip from Rome.</strong>&nbsp;It&rsquo;s a beautiful town home to two truly stupefying villas, and it&rsquo;s a short, convenient journey from Rome, either by train or as part of a&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome">guided tour</a>.</p>\n<p data-slot-rendered-content="true"><img class="entered lazyloaded" src="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg 1024w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-800x531.jpg 800w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-768x510.jpg 768w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1536x1020.jpg 1536w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-2048x1359.jpg 2048w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-150x100.jpg 150w" alt="A big, ornate outdoor fountain with an emerald green pool in front of it. People are walking around and taking pictures." width="807" height="536" data-lazy-srcset="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg 1024w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-800x531.jpg 800w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-768x510.jpg 768w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1536x1020.jpg 1536w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-2048x1359.jpg 2048w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-150x100.jpg 150w" data-lazy-sizes="(max-width: 1024px) 100vw, 1024px" data-lazy-src="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg" data-ll-status="loaded"></p>\n<p data-slot-rendered-content="true">&nbsp;</p>\n<p><strong>Best things to do in Tivoli:</strong>&nbsp;The main reason for visiting Tivoli are the two UNESCO World Heritage Sites, Villa d&rsquo;Este and Hadrian&rsquo;s Villa.&nbsp;Villa d&rsquo;Este is right in the center of Tivoli, while Hadrian&rsquo;s Villa is outside Tivoli in the countryside.</p>\n<p data-slot-rendered-content="true">Villa d&rsquo;Este is a 16th Century Italian Renaissance complex. While the interior features the most beautifully painted frescoes, I think the true highlight is the gardens. The gardens of Villa d&rsquo;Este are filled with ornate, unique fountains, each that differs from each other.</p>\n<p><strong>Should you book a tour or go independently:</strong>&nbsp;I recently visited independently, taking the train to Tivoli to visit Villa d&rsquo;Este. However, it was so tough to get to Hadrian&rsquo;s Villa &mdash; no Uber, no cabs, and infrequent buses &mdash; that we gave up and headed back to Rome.&nbsp;</p>\n<p>So if you want to see both Villa d&rsquo;Este and Hadrian&rsquo;s Villa in a single day, I recommend&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome" target="_blank" rel="noreferrer noopener nofollow">taking a tour</a>. But if you only want to see Villa d&rsquo;Este, you can get there pretty easily by train.</p>\n<p><strong>Book a tour to Tivoli:</strong>&nbsp;On this&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome" target="_blank" rel="noreferrer noopener nofollow">Tivoli Villas Full Day Trip From Rome</a>, you&rsquo;ll visit both Hadrian&rsquo;s Villa and Villa d&rsquo;Este with skip-the-line tours, plus time for lunch and a stroll in Tivoli.&nbsp;</p>\n<p data-slot-rendered-content="true"><strong>How to get from Rome to Tivoli independently:</strong> From Rome, you can take a direct train to Tivoli arriving in 30-60 minutes (depending on if you take an RV high-speed train or not). Once at the train station in Tivoli, cross the nearby bridge and Villa d&rsquo;Este is just a short walk away (10 minutes) while Hadrian&rsquo;s Villa is more than an hour&rsquo;s walk away (or a five-minute bus ride then 20-minute walk, if you can get a bus!).</p>	destination-guide	f	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/img20221116_12483404 2.jpg	2024-12-12 09:46:48.373	0	41
1	Rome	2	2024-12-10 20:27:54.015	<h1 class="wp-block-heading">Best Day Trips from Rome</h1>\n<h3 class="wp-block-heading"><span id="tivoli" class="ez-toc-section"></span>Tivoli</h3>\n<p data-slot-rendered-content="true"><strong>Tivoli is my personal top recommendation for a day trip from Rome.</strong>&nbsp;It&rsquo;s a beautiful town home to two truly stupefying villas, and it&rsquo;s a short, convenient journey from Rome, either by train or as part of a&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome">guided tour</a>.</p>\n<p data-slot-rendered-content="true"><img class="entered lazyloaded" src="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg" sizes="(max-width: 1024px) 100vw, 1024px" srcset="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg 1024w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-800x531.jpg 800w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-768x510.jpg 768w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1536x1020.jpg 1536w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-2048x1359.jpg 2048w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-150x100.jpg 150w" alt="A big, ornate outdoor fountain with an emerald green pool in front of it. People are walking around and taking pictures." width="807" height="536" data-lazy-srcset="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg 1024w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-800x531.jpg 800w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-768x510.jpg 768w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1536x1020.jpg 1536w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-2048x1359.jpg 2048w, https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-150x100.jpg 150w" data-lazy-sizes="(max-width: 1024px) 100vw, 1024px" data-lazy-src="https://www.adventurouskate.com/wp-content/uploads/2024/08/Tivoli-Things-to-Do-in-Rome-1024x680.jpg" data-ll-status="loaded"></p>\n<p data-slot-rendered-content="true">&nbsp;</p>\n<p><strong>Best things to do in Tivoli:</strong>&nbsp;The main reason for visiting Tivoli are the two UNESCO World Heritage Sites, Villa d&rsquo;Este and Hadrian&rsquo;s Villa.&nbsp;Villa d&rsquo;Este is right in the center of Tivoli, while Hadrian&rsquo;s Villa is outside Tivoli in the countryside.</p>\n<p data-slot-rendered-content="true">Villa d&rsquo;Este is a 16th Century Italian Renaissance complex. While the interior features the most beautifully painted frescoes, I think the true highlight is the gardens. The gardens of Villa d&rsquo;Este are filled with ornate, unique fountains, each that differs from each other.</p>\n<p><strong>Should you book a tour or go independently:</strong>&nbsp;I recently visited independently, taking the train to Tivoli to visit Villa d&rsquo;Este. However, it was so tough to get to Hadrian&rsquo;s Villa &mdash; no Uber, no cabs, and infrequent buses &mdash; that we gave up and headed back to Rome.&nbsp;</p>\n<p>So if you want to see both Villa d&rsquo;Este and Hadrian&rsquo;s Villa in a single day, I recommend&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome" target="_blank" rel="noreferrer noopener nofollow">taking a tour</a>. But if you only want to see Villa d&rsquo;Este, you can get there pretty easily by train.</p>\n<p><strong>Book a tour to Tivoli:</strong>&nbsp;On this&nbsp;<a href="https://www.viator.com/tours/Rome/Day-Trip-From-Rome-to-Tivoli-Villas-with-Lunch/d511-128932P1?pid=P00056924&amp;mcid=42383&amp;medium=link&amp;campaign=day-trips-from-rome" target="_blank" rel="noreferrer noopener nofollow">Tivoli Villas Full Day Trip From Rome</a>, you&rsquo;ll visit both Hadrian&rsquo;s Villa and Villa d&rsquo;Este with skip-the-line tours, plus time for lunch and a stroll in Tivoli.&nbsp;</p>\n<p data-slot-rendered-content="true"><strong>How to get from Rome to Tivoli independently:</strong> From Rome, you can take a direct train to Tivoli arriving in 30-60 minutes (depending on if you take an RV high-speed train or not). Once at the train station in Tivoli, cross the nearby bridge and Villa d&rsquo;Este is just a short walk away (10 minutes) while Hadrian&rsquo;s Villa is more than an hour&rsquo;s walk away (or a five-minute bus ride then 20-minute walk, if you can get a bus!).</p>	destination-guide	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/img20221116_21124525 2.jpg	2024-12-16 20:38:33.025	0	50
8	Join Me In The Arctic	1	2024-12-16 23:06:08.93	<p>I&rsquo;ve made it no secret; over the years, I&rsquo;ve become obsessed with polar travel.</p>\n<p>In fact, I&rsquo;ve become so obsessed that I am now&nbsp;<a href="https://youngadventuress.com/2023/06/polar-travel.html">an expedition guide</a>, spending roughly half the year at sea in Antarctica and the Arctic. And I&rsquo;m not slowing down anytime soon. I&rsquo;ve already started a three-month season with&nbsp;<a href="https://www.adventurecanada.com/">Adventure Canada</a>&nbsp;in the Arctic for this summer in Canada and Greenland.</p>\n<p>These polar places are almost inaccessible. The easiest and most efficient way to visit is by expedition ship. Most of the year, sea ice locks the Arctic away. Only for a few months in the summer does it melt enough to allow access. Most people get around by small planes, boats, or snowmobiles (in winter). Personally, I find this isolation fascinating.</p>\n<p>Here, whales swim by us all the time, polar bears peek out from behind the sea ice, and colorful communities give us the most incredible welcomes. The Arctic is vast, wild, and unpredictable. It gets under your skin.</p>\n<div class="info-box">Curious about traveling to the Arctic?&nbsp;<a href="https://youngadventuress.com/travel-to-the-arctic" target="_blank" rel="noopener">Check out my trips and learn more here</a></div>\n<p>If you&rsquo;re already keen to go, you can fill out this form, and I&rsquo;ll help you find&nbsp;your dream trip!</p>\n<p><img class="alignnone wp-image-33458 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/06/F_10-10-2023-18-11-24-copy-500x333.jpg 500w" alt="travel to the Arctic" width="1263" height="842" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p><img class="attachment-full size-full" src="https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy.jpg" sizes="(max-width: 1333px) 100vw, 1333px" srcset="https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy.jpg 1333w, https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy-433x650.jpg 433w, https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy-682x1024.jpg 682w, https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy-768x1152.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy-1024x1536.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/05/136A8628-Enhanced-NR-3-copy-500x750.jpg 500w" alt="" width="803" height="1205" loading="lazy" data-pin-description="A big life update: join me in the Arctic" data-pin-title="A big life update: join me in the Arctic"><img class="attachment-full size-full" src="https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy.jpg" sizes="(max-width: 1334px) 100vw, 1334px" srcset="https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy.jpg 1334w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy-434x650.jpg 434w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy-683x1024.jpg 683w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy-768x1151.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy-1025x1536.jpg 1025w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2844-copy-500x750.jpg 500w" alt="" width="801" height="1202" loading="lazy" data-pin-description="A big life update: join me in the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p><img class="alignnone wp-image-33560 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/06/136A8181-copy-500x333.jpg 500w" alt="travel to the Arctic" width="2000" height="1333" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p>Lately, I&rsquo;ve been reflecting a lot on my work over the years, blogging, writing, and taking photos. I managed to craft a career out of thin air, getting paid to travel the world and write about it. But if I&rsquo;m being honest, I&rsquo;ve felt somewhat disillusioned since the pandemic. I&rsquo;m tired of hustling. I&rsquo;m tired of the meaningless competition. It&rsquo;s not good for my headspace or creativity.</p>\n<p>Don&rsquo;t get me wrong, I wouldn&rsquo;t change a thing in the past. But I think I&rsquo;ve grown and stepped onto a new path I&rsquo;m keen to explore more of. Guiding.</p>\n<p>Visiting the Arctic and writing about it isn&rsquo;t enough for me. Deep down, I yearned to be part of a team again, a community.&nbsp;<a href="https://www.adventurecanada.com/adventure-canada-history">Adventure Canada</a>&nbsp;feels like family. Owned and operated by three siblings (started by their dad, uncle, and friend), as soon as you step on board, you feel a connection like no other. The same guides always come back year after year &ndash; it feels like going to summer camp and reuniting with all of your friends. And it&rsquo;s the same with the passengers.</p>\n<p>On most trips, half of the passengers are returning, having traveled with AC before. I mean, you can&rsquo;t invent that kind of loyalty.&nbsp;</p>\n<p><img class="alignnone wp-image-33417 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-scaled.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-scaled.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-1024x683.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-2048x1365.jpg 2048w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/06/F_20-09-2023-16-25-56-copy-500x333.jpg 500w" alt="travel to the Arctic" width="1464" height="976" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p><img class="alignnone wp-image-33161 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/05/136A2866-copy-500x333.jpg 500w" alt="travel to the Arctic" width="1440" height="960" loading="lazy" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p><img class="alignnone wp-image-32860 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/03/136A4315-copy-2-500x333.jpg 500w" alt="travel to the Arctic" width="2000" height="1333" loading="lazy" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p>I know it sounds super cheesy, but working in the Arctic fulfills me in a way I didn&rsquo;t know I needed. It&rsquo;s freaking hard work but so worth it. I feel like I belong here. It&rsquo;s an area I know really well, and I love sharing it with others.</p>\n<p>Whether I&rsquo;m driving zodiacs around icebergs the size of skyscrapers, looking for wildlife from the bridge with my eyes glued to my binoculars, or hanging out with everyone in the evenings listening to live music as we steam onwards to our next destination, I&rsquo;m just so happy. On one trip alone last year, I saw 20&nbsp;<a href="https://youngadventuress.com/travel-to-the-arctic" target="_blank" rel="noopener">polar bears</a>, including a mom and cubs eating a beluga whale. I walked on sea ice and followed in Franklin&rsquo;s footsteps on Beechey Island before falling asleep beneath the dancing northern lights in Greenland. I mean, come on!</p>\n<p>Over the past year, I have considered the direction I want to take with my work, and I always end up in the same place: polar travel. So, I&rsquo;ve decided to try something new. In addition to continuing to write and share travel stories, I&rsquo;m also going to start selling polar trips.</p>\n<p><img class="alignnone wp-image-33304 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/05/f-10-2023-21-00-29-copy-2-500x333.jpg 500w" alt="travel to the Arctic" width="2000" height="1333" loading="lazy" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"><img alt="" data-pin-description="A big life update: join me in the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p><img class="alignnone wp-image-33336 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/05/017A9766-copy-500x333.jpg 500w" alt="travel to the Arctic" width="2000" height="1333" loading="lazy" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p><img class="alignnone wp-image-32823 size-full" src="https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy.jpg" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy.jpg 2000w, https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy-650x433.jpg 650w, https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy-1024x682.jpg 1024w, https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy-768x512.jpg 768w, https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy-1536x1024.jpg 1536w, https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy-1920x1280.jpg 1920w, https://youngadventuress.com/wp-content/uploads/2024/03/F_04-10-2023-23-05-41-copy-500x333.jpg 500w" alt="travel to the Arctic" width="2000" height="1333" loading="lazy" data-pin-description="travel to the Arctic" data-pin-title="A big life update: join me in the Arctic"></p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>If you or someone you know is interested in&nbsp;<a href="https://youngadventuress.com/travel-to-the-arctic" target="_blank" rel="noopener">traveling to the Arctic</a>, let me help connect you with the perfect trip.</p>\n<p>Almost like a travel agent, if someone books a trip to the Arctic through my referral, I&rsquo;ll make a small commission. I know that no one likes to be sold to, me included, but I&rsquo;m hoping that by using my knowledge, skills, and experience in the Arctic to help people book the perfect trip there, it&rsquo;s worth it. I will also be on many of the trips, so you can travel with me (if you want, haha). I&rsquo;m fun, I swear!</p>\n<p>To be honest, I already do this kind of thing anyway; this just makes it more hands-on and a little more official. Being honest about this is really important to me. Changing direction with my income means that I can step back from the Influencer world and focus on the things I really love. It will free me up to be creative, play, and have fun again. It will also give me free reign to never shut up about the polar places I love. Sorry, not sorry.</p>	destination-guide	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/polarbear.jpg	2024-12-16 23:06:35.882	0	39
4	dsfsdf	1	2024-12-11 06:02:03.951	<p>Start writing your blog!dfdsfsdfsdf</p>	travel-tips	t	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/img20221116_12234367 2.jpg	2024-12-16 20:39:40.135	0	8
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public."Comment" (id, content, created, "userId", "parentCommentId", "blogId", "postcardId") FROM stdin;
192	really cool	2024-12-14 04:40:01.709	2	\N	1	\N
202	really cool eh	2024-12-18 03:23:17.305	1	191	1	\N
206	this places looks beautiful!	2024-12-19 00:24:03.481	2	\N	\N	1
207	wow!	2024-12-19 00:24:26.84	2	\N	\N	1
211	looks like such a magical place	2024-12-19 00:37:59.727	1	\N	\N	1
215	Hey I know those two!	2024-12-19 03:36:09.523	1	\N	5	\N
219	nice	2024-12-19 06:33:38.167	1	214	8	\N
220	yup	2024-12-19 06:33:45.762	1	214	8	\N
193		2024-12-14 04:43:46.242	2	\N	1	\N
194	dsfsdfd	2024-12-14 04:44:07.574	2	191	1	\N
195	hi!	2024-12-14 04:44:18.456	2	190	1	\N
196	right?	2024-12-14 04:45:25.765	2	192	1	\N
197	yup!	2024-12-14 04:48:33.324	2	192	1	\N
203	thanks!	2024-12-18 04:42:12.34	2	191	1	\N
208	i'd love to go there some day	2024-12-19 00:26:44.379	2	\N	\N	2
212	i'll go there one day	2024-12-19 00:55:27.908	1	\N	\N	1
216	awesome!	2024-12-19 03:54:33.887	1	191	1	\N
221	jkbjbj	2024-12-20 01:20:41.025	1	\N	\N	10
222	uhkuhku	2024-12-20 01:23:01.936	1	218	8	\N
198	helooo	2024-12-14 05:22:20.835	2	190	1	\N
199	right?	2024-12-14 05:22:33.201	2	192	1	\N
200	hey cool stff	2024-12-14 05:23:18.51	2	\N	5	\N
204	amazing!	2024-12-18 23:56:05.093	1	\N	\N	1
209	incrediblee photo	2024-12-19 00:28:11.318	4	\N	\N	1
213	hjbhjbjh	2024-12-19 01:41:33.582	1	\N	2	\N
217	yup!	2024-12-19 03:56:26.98	1	191	1	\N
201	good stuff!	2024-12-14 05:26:40.185	1	\N	4	\N
205	jeju was so beautiful!	2024-12-19 00:15:15.788	1	\N	\N	2
210	need to go there one day	2024-12-19 00:31:14.181	4	\N	\N	1
214	I'd love to go there one day	2024-12-19 03:30:12.038	1	\N	8	\N
218	Me too!	2024-12-19 06:32:01.69	1	\N	8	\N
190	hey!	2024-12-14 04:39:44.179	2	\N	1	\N
191	this is cool!	2024-12-14 04:39:50.727	2	\N	1	\N
\.


--
-- Data for Name: Postcard; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public."Postcard" (id, picture, "countryCode", emoji, "userId", likes, views, "createdAt", caption, country, location) FROM stdin;
1	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/sunset.webp	IE	🇮🇪	1	0	0	2024-12-18 17:18:23.572	Watching the sun go down in Doolin, Ireland	Ireland	Doolin, County Clare, Ireland
2	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/Untitled_3.4.1.jpg	KR	🇰🇷	1	0	0	2024-12-18 17:21:33.533	Such a beautiful place in Jeju, South Korea!	South Korea	Jeju, South Korea
3	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/tofino.png	CA	🇨🇦	1	0	0	2024-12-19 06:37:11.115	Just steps from our campsite	Canada	Tofino, BC, Canada
4	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/Untitled_1.19.1.jpg	KR	🇰🇷	1	0	0	2024-12-19 06:38:36.769	Korea!	South Korea	Seoul, South Korea
5	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/img20221116_21112866.jpg	IE	🇮🇪	1	0	0	2024-12-19 06:39:28.678	Cows just chillin	Ireland	Doolin, County Clare, Ireland
6	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/mohercliffs.jpg	IE	🇮🇪	1	0	0	2024-12-19 06:40:21.09	The amazing Cliffs of Moher!	Ireland	Lahinch, County Clare, Ireland
7	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/street.jpg	US	🇺🇸	1	0	0	2024-12-19 06:41:14.033	Downtown vibes	United States	New York, NY, USA
8	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/japan-garden.jpg	JP	🇯🇵	1	0	0	2024-12-19 06:41:42.879	Zen garden	Japan	Tokyo, Japan
9	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/japan-colorful.jpg	JP	🇯🇵	1	0	0	2024-12-19 06:42:37.383	I miss walking around in my kimono	Japan	Kyoto, Japan
10	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/japan-street.jpg	JP	🇯🇵	1	0	0	2024-12-19 06:43:35.695	Caught in the moment	Japan	Osaka, Japan
11	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC08917-2.JPEG	JP	🇯🇵	1	0	0	2024-12-19 06:44:49.978	i love my kimono	Japan	Osaka, Japan
12	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC07196.JPG	JP	🇯🇵	1	0	0	2024-12-19 06:45:51.036	 ✍️ ✍️ ✍️	Japan	Tokyo, Japan
13	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC00587-2.JPG	JP	🇯🇵	1	0	0	2024-12-19 06:46:37.879	Is that a dog or a fish	Japan	Osaka, Japan
14	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC07118-2.JPG	JP	🇯🇵	1	0	0	2024-12-19 06:47:07.082	The money shot	Japan	Shibuya, Tokyo, Japan
15	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC00512.JPG	JP	🇯🇵	1	0	0	2024-12-19 17:37:20.375	Just walking through a forest in Japan	Japan	Kyoto, Japan
16	https://d3amjv0mo6dgie.cloudfront.net/blogsite2/DSC07531-3.JPG	JP	🇯🇵	1	0	0	2024-12-19 21:55:57.899	One of the many shots from Japan	Japan	Osaka, Japan
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public."Session" (sid, "expiresAt", "userId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public."User" (id, email, "googleId", role, "createdAt", picture, "facebookId", name) FROM stdin;
1	mypointofdrew@gmail.com	105996317883871124403	ADMIN	2024-12-08 01:13:22.039	https://lh3.googleusercontent.com/a/ACg8ocJGdxZ_a7JSpdFbxip1qVVF6UB0LNekk1xJXoipxd1f4d5QnL0=s96-c	\N	Andrew Jung
2	fadestocodes@gmail.com	105553052093819417484	GUEST	2024-12-08 03:00:09.753	https://lh3.googleusercontent.com/a/ACg8ocKAFUyZWPhHUmLu0rDTGKFjWHlKplF8UeW6ZqCe7264_ibEew=s96-c	\N	Fadesto
4	drewj.hair@gmail.com	118233963090418220659	GUEST	2024-12-13 06:25:50.36	https://lh3.googleusercontent.com/a/ACg8ocL7VJ7k5OSQu8b-u6lgHZxjS0jyVaF8-r_2L2T0WFP4LZRBAg=s96-c	\N	Drew Jung
\.


--
-- Data for Name: _UserBookmarks; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public."_UserBookmarks" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: drew
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3f2d7c68-3161-41a2-a5dd-1c4feb92e60e	d6357953d1c9c26ac6b54d46b6eda94a07eea35f188a6a5fba46033678ba41ff	2024-12-17 21:57:01.189976-08	20241218055701_update_postcard	\N	\N	2024-12-17 21:57:01.186301-08	1
1301ea44-f782-42a8-8d97-0e1d61b55d8c	4477c6e2fb28e1ff5ef5497660e8eeaed8198b9f7a3281e03b306708c2d9d974	2024-12-06 21:50:00.99267-08	20241207055000_remove_username	\N	\N	2024-12-06 21:50:00.949129-08	1
1f25351e-1985-4866-8341-0caa5d162506	3b1be1fa7fa899e21ede67b09392ab9084eb71147b81dfdf76cad65054ad0a60	2024-12-09 10:47:02.815694-08	20241209184702_update_blogpost	\N	\N	2024-12-09 10:47:02.812492-08	1
c4d09e5d-f1e9-45ac-bfe7-3ac33b9ea5ab	ca1fee054b670a0f88581bd543e5b1c33e6bd4fc409dfc2f53bd8022b378041f	2024-12-10 12:17:50.19367-08	20241210201750_remove_tags	\N	\N	2024-12-10 12:17:50.190817-08	1
3c7bff03-dae5-469f-9c9e-d36f9758cced	6955f8eddd7d34adddaa063e6d4b330c92b05e6268bdc2245bb1dcee87eccb7e	2024-12-12 09:46:48.39873-08	20241212174648_updatedat	\N	\N	2024-12-12 09:46:48.371161-08	1
2752e1d9-8d58-43bb-bc38-3f6d41c85eab	e97178cacae474d6676189b7c72ef1b6c02722d3a34dcff8d8728aa8440c35d9	2024-12-15 21:59:44.119316-08	20241216055944_add_postcard	\N	\N	2024-12-15 21:59:44.096797-08	1
54063242-9467-4ca3-bbb7-82ec6a4bbe1c	278ca4b395ccc1c02af01b8dc2461e4aab8095849580861eba1b536423444cbe	2024-12-16 12:17:26.034706-08	20241216201726_update_views	\N	\N	2024-12-16 12:17:26.032505-08	1
ed07decd-3d51-4888-ac01-77f6174dbe54	eadefd4a15c1c0d9957b10324b4d17b314d24f070a4b93ca4c55dda5a9996b77	2024-12-16 12:22:53.765182-08	20241216202253_update_views	\N	\N	2024-12-16 12:22:53.763533-08	1
84ef69fd-ccfc-4e4e-8aff-173ce1b68713	bb6eb92064b4d06792e5be3fd9d6612df5c623cf32976054b2ef736f903f83b3	2024-12-16 12:38:21.037067-08	20241216203821_update_views	\N	\N	2024-12-16 12:38:21.034784-08	1
0a5e5001-25c7-490d-a050-c5170c5cce36	46bab830d7e852a9d870476e857cad57417946ae43e9354d2f2873829ad09b69	2024-12-16 20:53:54.946783-08	20241217045354_update_postcard	\N	\N	2024-12-16 20:53:54.942737-08	1
48b1607e-bafd-449f-9e99-5db409a3030d	2965ff40525096ea7f65de756349cef6ed345015a20da35667024ca9eaef50ed	2024-12-16 22:07:42.723216-08	20241217060742_update_postcards	\N	\N	2024-12-16 22:07:42.719919-08	1
34810650-fef4-4eeb-bbd9-590fd083e53c	ee0d154d2aaea3b50650ce97e4217a239fbb3434b5be83eb9942428faf63021c	2024-12-17 09:43:41.506712-08	20241217174341_add_facebook_id	\N	\N	2024-12-17 09:43:41.499631-08	1
56b624e6-2a17-465d-974d-62feb041f0f3	7b9718f7d88c937343e4f4c48245db6c6e9d645b05fb3e74642d91b3a980f21a	2024-12-17 10:57:22.777814-08	20241217185722_update_user	\N	\N	2024-12-17 10:57:22.775463-08	1
6b48329d-1770-45b3-a895-0b1830642c30	80d62ea7f673aafe046b10ec55a3af61b79e7aad85a2201875d783821065dfbe	2024-12-17 21:53:43.77836-08	20241218055343_update_postcard	\N	\N	2024-12-17 21:53:43.775947-08	1
\.


--
-- Name: Blogpost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: drew
--

SELECT pg_catalog.setval('public."Blogpost_id_seq"', 8, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: drew
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 222, true);


--
-- Name: Postcard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: drew
--

SELECT pg_catalog.setval('public."Postcard_id_seq"', 16, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: drew
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: Blogpost Blogpost_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Blogpost"
    ADD CONSTRAINT "Blogpost_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Postcard Postcard_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Postcard"
    ADD CONSTRAINT "Postcard_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (sid);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _UserBookmarks _UserBookmarks_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."_UserBookmarks"
    ADD CONSTRAINT "_UserBookmarks_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Session_sid_key; Type: INDEX; Schema: public; Owner: drew
--

CREATE UNIQUE INDEX "Session_sid_key" ON public."Session" USING btree (sid);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: drew
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_facebookId_key; Type: INDEX; Schema: public; Owner: drew
--

CREATE UNIQUE INDEX "User_facebookId_key" ON public."User" USING btree ("facebookId");


--
-- Name: User_googleId_key; Type: INDEX; Schema: public; Owner: drew
--

CREATE UNIQUE INDEX "User_googleId_key" ON public."User" USING btree ("googleId");


--
-- Name: _UserBookmarks_B_index; Type: INDEX; Schema: public; Owner: drew
--

CREATE INDEX "_UserBookmarks_B_index" ON public."_UserBookmarks" USING btree ("B");


--
-- Name: Blogpost Blogpost_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Blogpost"
    ADD CONSTRAINT "Blogpost_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_blogId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES public."Blogpost"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_parentCommentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_postcardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postcardId_fkey" FOREIGN KEY ("postcardId") REFERENCES public."Postcard"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Postcard Postcard_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Postcard"
    ADD CONSTRAINT "Postcard_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _UserBookmarks _UserBookmarks_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."_UserBookmarks"
    ADD CONSTRAINT "_UserBookmarks_A_fkey" FOREIGN KEY ("A") REFERENCES public."Blogpost"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserBookmarks _UserBookmarks_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: drew
--

ALTER TABLE ONLY public."_UserBookmarks"
    ADD CONSTRAINT "_UserBookmarks_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

