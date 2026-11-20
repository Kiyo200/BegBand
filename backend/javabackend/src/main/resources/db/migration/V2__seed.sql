--
-- PostgreSQL database dump
--


-- Dumped from database version 16.11 (Homebrew)
-- Dumped by pg_dump version 16.11 (Homebrew)

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
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Role" VALUES (1, 'user');
INSERT INTO public."Role" VALUES (2, 'admin');
INSERT INTO public."Role" VALUES (3, 'band_member');
INSERT INTO public."Role" VALUES (4, 'band_leader');


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Role_id_seq"', 4, true);


--
-- PostgreSQL database dump complete
--


