const portfolio = {
    projects: [
        {
            "id": "Multi-Agent Harness",
            "title": "Personal Multi-Agentic Coding Harness",
            "teaser": "Building my own claude code",
            "description": "As a college student, money doesn't come by often! Using NVIDIA's developer pack, I simulate the Mixture of Experts (MoE) architecture for coding agents and architected a multi-agent coding harness orchestrating DeepSeek V4 Flash as a planning agent and GLM 5.2 as a code-generation agent over NVIDIA’s free-tier inference endpoints (Saving me 20 dollars per month!). It also automates PR generation with human-in-the-loop approval (depicted above).",
            "github_url": "https://github.com/lalitj5/agent",
            "previewImage": "previews/projects/personal-harness.png",
            "tags": ["Python", "FastAPI", "GithubAPI"]
        },
        {
            "id": "formalization-proj",
            "title": "Fooling LLM-Based Code Verification Systems",
            "teaser": "We red-teamed a SOTA Code Verification Loop known as Clover.",
            "description": "LLM-based program verification systems promise stronger correctness guarantees than testing or type systems alone, but their robustness to adversarial inputs remains underexplored. We study Clover, a verification framework that checks correctness by enforcing mutual consistency across a program's natural language docstring, formal specification, and implementation. We ask whether an LLM can systematically generate adversarial programs that evade Clover's detection.",
            "overleaf_url": "./papers/clover.pdf",
            "github_url": "https://github.com/lalitj5/formalization-proj",
            "previewImage": "previews/projects/beating-clover.png",
            "tags": ["Python", "AI Safety", "Program Synthesis"]
        },
        {
            "id": "mbox-reader",
            "title": "Command Line .mbox File Search and Read",
            "teaser": "Short Python-based CLI for querying MBOX files",
            "description": "When graduating, I backed up my school emails into an unfamiliar .mbox format. Online viewers were littered with frustrating ads, so I built this simple terminal program to parse and access my emails easily.",
            "github_url": "https://github.com/lalitj5/mbox-reader",
            "previewImage": "previews/projects/mbox-reader.png",
            "tags": ["Python"]
        },
    ],

    writing: [
    {
        "id": "deepseek-architecture",
        "title": "DeepSeek Architecture (Coming Soon!)",
        "teaser": "DeepSeek Architecture, Simply Explained.",
        "description": "Demystify the engineering breakthroughs behind DeepSeek's massive open-source models. Tailored for developers and AI researchers, this deep dive breaks down how Mixture-of-Experts (MoE), Multi-head Latent Attention (MLA), and cost-efficient training pipelines achieve GPT-4-level performance at a fraction of the traditional infrastructure cost.",
        "url": "https://newsletter.aibutsimple.com/p/deepseek-architecture",
        "previewImage": "previews/articles/DeepSeekArchitectureCover.png",
        "date": "2026-08-24"
    },
    {
        "id": "sparse-autoencoders",
        "title": "Sparse Autoencoders, Simply Explained (Coming Soon!)",
        "teaser": "Sparse Autoencoders, Simply Explained.",
        "description": "Crack open the LLM 'black box' with an accessible guide to mechanistic interpretability. Written for machine learning engineers and AI ethicists, this article explains how Sparse Autoencoders (SAEs) extract human-understandable concepts from raw neural network activations, transforming dense vectors into clear, distinct features.",
        "url": "https://newsletter.aibutsimple.com/p/sparse-autoencoders-simply-explained",
        "previewImage": "previews/articles/SAEInterpCover.png",
        "date": "2026-07-27"
    },
    {
        "id": "multi-token-prediction",
        "title": "Multi-Token Prediction, Simply Explained",
        "teaser": "Multi-Token Prediction, Simply Explained.",
        "description": "Explore the next evolution of language modeling beyond standard next-token generation. Ideal for data scientists and LLM hobbyists, this breakdown covers how training models to predict multiple future tokens simultaneously boosts generation speed, enhances sample efficiency, and improves reasoning across complex coding and math benchmarks.",
        "url": "https://newsletter.aibutsimple.com/p/multi-token-prediction-simply-explained",
        "previewImage": "previews/articles/MTPCover.png",
        "date": "2026-06-01"
    },
    {
        "id": "reward-hacking",
        "title": "Reward Hacking, Simply Explained",
        "teaser": "Reward Hacking, Simply Explained.",
        "description": "What happens when AI models cheat their way to a perfect score? Targeted at AI alignment enthusiasts and reinforcement learning practitioners, this article explores the fascinating phenomena of reward hacking in RLHF—detailing how models find loopholes in reward functions and how researchers build guardrails to keep them honest.",
        "url": "https://newsletter.aibutsimple.com/p/reward-hacking-simply-explained",
        "previewImage": "previews/articles/RewardHackingCover.png",
        "date": "2026-05-11"
    },
    {
        "id": "graph-neural-networks",
        "title": "Graph Neural Networks (GNNs), Simply Explained",
        "teaser": "Graph Neural Networks (GNNs), Simply Explained.",
        "description": "Move beyond grids and sequences into the world of interconnected data. Designed for software engineers and data analysts, this visual guide breaks down how Graph Neural Networks process structural data like social networks, molecular structures, and recommendation systems using intuitive message-passing concepts.",
        "url": "https://newsletter.aibutsimple.com/p/graph-neural-networks-gnns-simply-explained",
        "previewImage": "previews/articles/GNNCover.png",
        "date": "2026-04-27"
    },
    {
        "id": "microgpt",
        "title": "MicroGPT, Simply Explained",
        "teaser": "MicroGPT, Simply Explained.",
        "description": "A minimalist, hands-on look at the foundational mechanics of generative pre-trained transformers. Perfect for coding beginners and curious techies, this piece strips away the industrial-scale complexity to show how a tiny, readable implementation of a GPT model operates from scratch under the hood.",
        "url": "https://newsletter.aibutsimple.com/p/microgpt-simply-explained",
        "previewImage": "previews/articles/MicroGPTCover.png",
        "date": "2026-04-06"
    },
    {
        "id": "vision-language-models",
        "title": "Vision Language Models (VL-JEPA), Simply Explained",
        "teaser": "Vision Language Models (VL-JEPA), Simply Explained.",
        "description": "Dive into Yann LeCun's Joint Embedding Predictive Architecture (JEPA) applied to multimodal data. For computer vision engineers and AI researchers, this article highlights how VL-JEPA models learn abstract world representations by predicting missing pieces of video and text data rather than obsessing over pixel-level details.",
        "url": "https://newsletter.aibutsimple.com/p/vision-language-models-vl-jepa-simply-explained",
        "previewImage": "previews/articles/VLMCover.png",
        "date": "2026-03-16"
    },
    {
        "id": "linear-attention-transformers",
        "title": "Linear Attention For Transformers (Kimi Linear), Simply Explained",
        "teaser": "Linear Attention For Transformers (Kimi Linear), Simply Explained.",
        "description": "Say goodbye to the quadratic memory bottleneck of traditional attention mechanisms. This analysis targets backend AI engineers and long-context developers, explaining how Kimi Linear and linear attention frameworks scale down computational complexity from $O(N^2)$ to $O(N)$ to unlock millions of tokens in context length.",
        "url": "https://newsletter.aibutsimple.com/p/linear-attention-for-transformers-kimi-linear-simply-explained",
        "previewImage": "previews/articles/LinearAttentionCover.png",
        "date": "2026-03-02"
    },
    {
        "id": "fine-tuning-llms",
        "title": "Fine-Tuning for LLMs, Simply Explained",
        "teaser": "Fine-Tuning for LLMs, Simply Explained.",
        "description": "A practical roadmap for customizing foundational models on proprietary data. Geared toward enterprise developers and product managers, this guide compares Full Fine-Tuning with Parameter-Efficient methods like LoRA and QLoRA, offering clear strategies on when to fine-tune versus when to use prompt engineering.",
        "url": "https://newsletter.aibutsimple.com/p/fine-tuning-for-llms-simply-explained",
        "previewImage": "previews/articles/FinetuningCover.png",
        "date": "2026-02-02"
    },
    {
        "id": "optimizing-attention",
        "title": "A Deep Dive into Modern Transformers: Optimizing Attention",
        "teaser": "A Deep Dive into Modern Transformers: Optimizing Attention.",
        "description": "An optimization-focused masterclass on making transformers leaner and faster. Intended for performance engineers and infrastructure specialists, this post charts the history and mechanics of modern attention variants—including Multi-Query Attention (MQA), Grouped-Query Attention (GQA), and the hardware-aware magic of FlashAttention.",
        "url": "https://newsletter.aibutsimple.com/p/a-deep-dive-into-modern-transformers-optimizing-attention",
        "previewImage": "previews/articles/AttentionOptimizationCover.png",
        "date": "2026-01-19"
    },
    {
        "id": "gpu-optimization",
        "title": "GPU Optimization for Machine Learning, Simply Explained",
        "teaser": "GPU Optimization for Machine Learning, Simply Explained.",
        "description": "Stop wasting expensive cloud compute. Written specifically for MLOps engineers and AI infrastructure teams, this article breaks down the absolute essentials of hardware optimization, covering mixed-precision training (FP16/BF16), tensor cores, memory alignment, and how to eliminate standard data-loading bottlenecks.",
        "url": "https://newsletter.aibutsimple.com/p/gpu-optimization-for-machine-learning-simply-explained",
        "previewImage": "previews/articles/GPUOptimizationCover.png",
        "date": "2025-12-29"
    },
    {
        "id": "llm-security",
        "title": "LLM Security (Prompt Injection, Adversarial Attacks), Simply Explained",
        "teaser": "LLM Security (Prompt Injection, Adversarial Attacks), Simply Explained.",
        "description": "Securing the modern AI application stack against adversarial manipulation. Tailored for cyber security professionals and application developers, this post explains the engineering behind common vulnerabilities like prompt injections, jailbreaks, and data exfiltration, alongside practical defense-in-depth mitigation strategies.",
        "url": "https://newsletter.aibutsimple.com/p/llm-security-prompt-injection-adversarial-attacks-simply-explained",
        "previewImage": "previews/articles/LLMSecurityCover.png",
        "date": "2025-12-01"
    },
    {
        "id": "nerfs",
        "title": "Neural Radiance Fields (NeRFs), Simply Explained",
        "teaser": "Neural Radiance Fields (NeRFs), Simply Explained.",
        "description": "Bridging the gap between 2D computer vision and 3D spatial reality. Aimed at graphics developers, game designers, and AI hobbyists, this visual guide simplifies how neural networks can turn a handful of flat, static smartphone photos into fully immersive, continuous 3D digital scenes using volumetric rendering.",
        "url": "https://newsletter.aibutsimple.com/p/neural-radiance-fields-nerfs-simply-explained",
        "previewImage": "previews/articles/NeRFsCover.png",
        "date": "2025-11-10"
    },
    {
        "id": "gpt-oss",
        "title": "GPT-OSS, Simply Explained (The Real Architecture of LLMs)",
        "teaser": "GPT-OSS, Simply Explained (The Real Architecture of LLMs).",
        "description": "An architectural breakdown of what open-source GPT variations actually look like when built for production. For full-stack developers and open-source advocates, this piece explores the open ecosystems, tokenizer formats, and layered weight architectures that form the backbone of today's dominant open-weights community.",
        "url": "https://newsletter.aibutsimple.com/p/gpt-oss-simply-explained-the-real-architecture-of-llms",
        "previewImage": "previews/articles/GPTOSSCover.png",
        "date": "2025-10-20"
    },
    {
        "id": "subliminal-learning",
        "title": "Subliminal Learning, Simply Explained",
        "teaser": "Subliminal Learning, Simply Explained.",
        "description": "Can neural networks learn from features and data signals that bypass overt attention? This theoretical deep dive explores hidden feature representations and implicit pattern recognition during model pre-training, offering cognitive AI researchers and curious techies a unique perspective on data extraction efficiency.",
        "url": "https://newsletter.aibutsimple.com/p/subliminal-learning-simply-explained",
        "previewImage": "previews/articles/SubliminalLearningCover.png",
        "date": "2025-10-06"
    },
    {
        "id": "llm-kv-caching",
        "title": "LLM KV Caching, Simply Explained",
        "teaser": "LLM KV Caching, Simply Explained.",
        "description": "The secret behind fast, streaming LLM chat responses. Intended for software engineers and systems architects, this technical walkthrough details how caching past Key and Value states prevents redundant attention calculations, drastically dropping token latency and optimizing memory throughput in multi-user environments.",
        "url": "https://newsletter.aibutsimple.com/p/llm-kv-caching-simply-explained",
        "previewImage": "previews/articles/KVCacheCover.png",
        "date": "2025-09-08"
    },
    {
        "id": "hierarchical-reasoning-models",
        "title": "Hierarchical Reasoning Models (HRMs), Simply Explained",
        "teaser": "Hierarchical Reasoning Models (HRMs), Simply Explained.",
        "description": "Moving beyond flat text generation into multi-layered cognitive planning. This article was a literature review on a trendy topic, evaluating how Hierarchical Reasoning Models break complex, multi-step problems down into high-level strategic objectives and low-level execution paths, paving the way for advanced agentic intelligence.",
        "url": "https://newsletter.aibutsimple.com/p/hierarchical-reasoning-models-hrms-simply-explained",
        "previewImage": "previews/articles/HRMCover.png",
        "date": "2025-08-25"
    },
    {
        "id": "RAG-MCP",
        "title": "RAG and MCP, But Simple",
        "teaser": "Visually breakdown how Retrieval Augmented generation and Model Context Protocols work!",
        "description": "Written for enterprise builders and app developers, this guide cleanly separates and connects Retrieval-Augmented Generation (RAG) for external data fetching with Anthropic's Model Context Protocol (MCP) for standardized, secure infrastructure communication.",
        "url": "https://newsletter.aibutsimple.com/p/retrieval-augmented-generation-rag-simply-explained",
        "previewImage": "previews/articles/RAGMCPCover.png",
        "date": "2025-08-04"
    },
    {
        "id": "agentic-ai",
        "title": "Agentic AI, But Simple",
        "teaser": "The 4 step loop to push LLMs into real environments.",
        "description": "Transforming static text predictors into autonomous digital coworkers. Aimed at product designers, developers, and tech leaders, this article breaks down the essential Perceive-Reason-Act-Learn framework that allows modern AI agents to use tools and execute complex workflows independently.",
        "url": "https://newsletter.aibutsimple.com/p/agentic-ai-simply-explained",
        "previewImage": "previews/articles/AgenticAICover.png",
        "date": "2025-07-14"
    }
    ],

    // Original writing: essays, research notes, reflections.
    // Fields: id, title, teaser, description, url, date ("YYYY-MM-DD"), optional previewImage
    essays: [
    {
        "id": "subliminal-learning",
        "title": "Subliminal Learning, Simply Explained",
        "teaser": "Subliminal Learning, Simply Explained.",
        "description": "Can neural networks learn from features and data signals that bypass overt attention? This theoretical deep dive explores hidden feature representations and implicit pattern recognition during model pre-training, offering cognitive AI researchers and curious techies a unique perspective on data extraction efficiency.",
        "url": "https://newsletter.aibutsimple.com/p/subliminal-learning-simply-explained",
        "previewImage": "previews/articles/SubliminalLearningCover.png",
        "date": "2025-10-06"
    },
    {
        "id": "reward-hacking",
        "title": "Reward Hacking, Simply Explained",
        "teaser": "Reward Hacking, Simply Explained.",
        "description": "What happens when AI models cheat their way to a perfect score? Targeted at AI alignment enthusiasts and reinforcement learning practitioners, this article explores the fascinating phenomena of reward hacking in RLHF—detailing how models find loopholes in reward functions and how researchers build guardrails to keep them honest.",
        "url": "https://newsletter.aibutsimple.com/p/reward-hacking-simply-explained",
        "previewImage": "previews/articles/RewardHackingCover.png",
        "date": "2026-05-11"
    },
    {
        "id": "llm-security",
        "title": "LLM Security (Prompt Injection, Adversarial Attacks), Simply Explained",
        "teaser": "LLM Security (Prompt Injection, Adversarial Attacks), Simply Explained.",
        "description": "Securing the modern AI application stack against adversarial manipulation. Tailored for cyber security professionals and application developers, this post explains the engineering behind common vulnerabilities like prompt injections, jailbreaks, and data exfiltration, alongside practical defense-in-depth mitigation strategies.",
        "url": "https://newsletter.aibutsimple.com/p/llm-security-prompt-injection-adversarial-attacks-simply-explained",
        "previewImage": "previews/articles/LLMSecurityCover.png",
        "date": "2025-12-01"
    }
    ],

    // Photography / art.
    // Fields: id, title, caption, image (web-sized file), category ("Photography" | "Art"), date
    gallery: [],

    // Resume. Fill in the TODO items; set pdf to e.g. "papers/resume.pdf" to show a download button.
    resume: {
        pdf: "",
        // Text copied verbatim from the PDF. Entry fields: title, location (right of title),
        // subtitle, date (right of subtitle), bullets, detail.
        sections: [
            {
                heading: "Education",
                entries: [
                    {
                        title: "Georgia Institute of Technology -- GPA: 4.0/4.0",
                        location: "Atlanta, GA",
                        subtitle: "B.S. Math and Computing",
                        date: "May 2029",
                        bullets: [
                            "Coursework: Machine Learning, Data Structures and Algorithm Design, Quantum Computing",
                            "Clubs: AI Safety Initiative @ GT Operations & Technical Fellow, HackGT Operations Co-Director, CS 1301 TA"
                        ]
                    }
                ]
            },
            {
                heading: "Experience",
                entries: [
                    {
                        title: "AI, But Simple | 270K+ IG Followers and 10K Subscribers",
                        location: "Atlanta, GA",
                        subtitle: "AI Research, Educational – Part-Time",
                        date: "June 2025 – Present",
                        bullets: [
                            "Built weekly code tutorials explaining new advances in machine learning and AI research infrastructure to 10K weekly readers and preparing comprehensive technical articles to go beside them (52% open rate)",
                            "Implemented tiled GPU kernals to demonstrate 1.5x time speedup compared to naive implementations",
                            "Demonstrated data poisoning for LLM Security article and gaussian noise defense to reduce poisoned outputs by 7x; Used Sparse Autoencoders to visualize and map features to neurons and performed feature steering"
                        ]
                    },
                    {
                        title: "Georgia Institute of Technology Community Service Project & Marietta, GA",
                        location: "Atlanta, GA",
                        subtitle: "CSP Project Manager for Digital Twin @ Marietta, GA",
                        date: "Sep. 2025 – Dec. 2025",
                        bullets: [
                            "Led 9-person team and served as liaison to City of Marietta stakeholders to develop prototypical Digital Twin infrastructure; project presentation voted #3 Overall at Fall '25 Showcase by CSP Executive Board",
                            "Built regression model to predict congestion patterns across major Marietta corridors; validated against next-day traffic data with 94% accuracy and integrated into Streamlit dashboard"
                        ]
                    }
                ]
            },
            {
                heading: "Projects",
                entries: [
                    {
                        title: "LLM Alignment Audit: GPT-5 Mini vs Claude Haiku 4.5 | Python, Inspect AI, Petri, DeepSeek API, SciPy",
                        bullets: [
                            "Ran 232 automated multi-turn alignment audits with Petri on a $20 budget, using DeepSeek Flash as the adversarial auditor and LLM judge; wrote a custom Inspect model provider so DeepSeek's thinking mode could handle forced tool calls efficiently with parallelized throughput to speed-up experiments",
                            "Found GPT-5 Mini scored significantly higher on financial misconduct than Haiku (7.15 vs 4.70, p = 0.035), and Haiku verbalized evaluation awareness in 19/50 broad audits vs 0/50, without scoring safer",
                            "Caught a judge failure mode where the LLM judge scored the model's self-justification instead of its actions"
                        ]
                    },
                    {
                        title: "Formal Verification & Incident Containment Sandbox | Python, Dafny, Docker, FastAPI, AST",
                        bullets: [
                            "Engineered a mathematical state-verification interceptor in Dafny to enforce runtime invariant policies over agent execution traces, blocking unauthorized data exfiltration and restricted filesystem corruption.",
                            "Built a high-throughput FastAPI interceptor parsing bash ASTs into abstract state transitions, filtering 1,200+ raw agent commands across 3 enforcement tiers (execution, boundary warning, refusal).",
                            "Constructed an interactive forensic timeline dashboard in SVG/JavaScript to visualize real-time taint propagation, heuristic safety distances, and OS-level boundary violations."
                        ]
                    },
                    {
                        title: "Clover LLM Code Verification & Adversarial Evasion Pipeline | Python, Claude 4.5 Sonnet, Dafny",
                        bullets: [
                            "Architected an automated evaluation pipeline integrating Claude 4.5 Sonnet with the Dafny formal verifier to systematically generate adversarial code mutations – wrote independent tests and evaluations",
                            "Demonstrated that consistency-based LLM verifiers fail to detect 73.3% of logically equivalent specification attacks, highlighting critical semantic vulnerabilities in AI-driven program/codebase synthesis"
                        ]
                    },
                    {
                        title: "Personal Multi-Agentic Coding Harness | Python, FastAPI, NVIDIA Developer Pack, GithubAPI",
                        bullets: [
                            "Architected a multi-agent coding harness orchestrating DeepSeek V4 Flash as a planning agent and GLM 5.2 as a code-generation agent over NVIDIA's free-tier inference endpoints (Saving me 20 dollars per month)",
                            "Built FastAPI backend that augments prompts with repo context pulled via the GitHub API, constraining planner output to 1024 tokens before handing structured plans to the coding agent",
                            "Automated PR generation with human-in-the-loop approval, opening the harness's first end-to-end pull request; currently extending the coding agent to support multi-file writes"
                        ]
                    }
                ]
            },
            {
                heading: "Technical Skills",
                entries: [
                    { detail: "Languages: Python, C++, Java, Unix, JavaScript, HTML/CSS, React, LaTeX" },
                    { detail: "Libraries: PyTorch, Einops/Einsum, NumPy, scikit-image, transformers, pandas, scikit-learn, OpenCV, Matplotlib" },
                    { detail: "Developer Tools: Jira, Git, Figma, Vercel, AWS Cloud, LangChain, Claude Code, ARENA AI Safety RL Chapter" }
                ]
            }
        ]
    }
};
