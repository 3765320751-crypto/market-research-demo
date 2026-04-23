lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade-up").forEach((element) => {
    gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        }
    );
});

gsap.utils.toArray(".counter").forEach((counter) => {
    const targetValue = parseFloat(counter.getAttribute("data-target"));
    gsap.fromTo(
        counter,
        { innerHTML: 0 },
        {
            innerHTML: targetValue,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 90%",
            },
            onUpdate: function () {
                if (targetValue % 1 !== 0) {
                    counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
                } else {
                    counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                }
            },
        }
    );
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
        const target = document.querySelector(button.getAttribute("data-scroll-target"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

const demoStages = [
    { title: "信息管理", note: "录入产品信息与目标人群" },
    { title: "帖子生成", note: "将产品转成社交平台帖子" },
    { title: "社交模拟", note: "触发评论与互动辩论" },
    { title: "分析结果", note: "输出市场调研结论" },
];

const demoAgents = [
    { name: "校园轻饮派", meta: "20 岁 · 大学生", style: "追颜值、爱分享", tags: ["奶茶平替", "拍照"] },
    { name: "白领控糖党", meta: "27 岁 · 品牌策划", style: "看成分、看负担", tags: ["轻食", "通勤"] },
    { name: "理性男生代表", meta: "26 岁 · 程序员", style: "看价格、看回购", tags: ["优惠", "参数对比"] },
    { name: "健身自律派", meta: "31 岁 · 健身教练", style: "看健康感、看糖分", tags: ["配料表", "运动后"] },
    { name: "宝妈家庭型", meta: "34 岁 · 团购团长", style: "考虑家庭场景", tags: ["囤货", "家庭消费"] },
    { name: "潮流美妆生", meta: "23 岁 · 美妆博主", style: "看包装与话题性", tags: ["种草", "颜值"] },
];

const demoState = {
    stage: 0,
    simulation: null,
};

function getProductData() {
    return {
        name: document.getElementById("productName").value.trim(),
        flavor: document.getElementById("productFlavor").value.trim(),
        sugar: document.getElementById("productSugar").value.trim(),
        price: document.getElementById("productPrice").value.trim(),
        packaging: document.getElementById("productPackaging").value.trim(),
        audience: document.getElementById("productAudience").value.trim(),
        highlights: document.getElementById("productHighlights").value.trim(),
    };
}

function buildDemoSimulation() {
    const product = getProductData();
    return {
        post: {
            body: `新出了一款 ${product.flavor} 风味的 ${product.name}，主打 ${product.sugar}，包装为 ${product.packaging}。目标人群锁定 ${product.audience}，建议零售价约 ${product.price} 元。${product.highlights} 大家会买吗？`,
            tags: ["新品试水", "用户共创", "社交讨论", "市场调研"],
        },
        comments: [
            { type: "comment", name: "校园轻饮派", meta: "20 岁 · 大学生", sentiment: "positive", text: "包装很有记忆点，如果线下陈列好看，我愿意为了这个口味先买一瓶试试。" },
            { type: "comment", name: "白领控糖党", meta: "27 岁 · 品牌策划", sentiment: "positive", text: "低糖表达对我有吸引力，但还是要继续看口味完成度和成分信息。" },
            { type: "comment", name: "理性男生代表", meta: "26 岁 · 程序员", sentiment: "neutral", text: "我更看价格和复购逻辑，如果只是好看，不一定能长期买单。" },
            { type: "comment", name: "宝妈家庭型", meta: "34 岁 · 团购团长", sentiment: "neutral", text: "如果面向家庭场景的表达再明确一点，购买理由会更充分。" },
            { type: "reply", name: "社交媒体观察者", meta: "回应 理性男生代表", sentiment: "neutral", text: "这类产品前期靠颜值有传播力，但后续必须补上价格和场景理由。" },
            { type: "reply", name: "健身自律派", meta: "回应 白领控糖党", sentiment: "positive", text: "低糖是入场券，如果能强调“轻负担但不寡淡”，转化会更稳。" },
        ],
        report: {
            sentiment: { positive: 57, neutral: 28, negative: 15 },
            focusItems: [
                { name: "包装颜值", percent: 78 },
                { name: "价格敏感度", percent: 66 },
                { name: "低糖健康感", percent: 61 },
                { name: "人群匹配度", percent: 48 },
            ],
            conclusions: [
                "包装和颜色是最容易引发首轮讨论的卖点。",
                "低糖标签带来较高好感度，但用户仍会追问真实口味是否足够好喝。",
                "价格决定产品能否从尝鲜走向复购。",
            ],
            suggestions: [
                "建议将首发价格控制在 5 元以内或给出组合优惠。",
                "补充通勤、午后和轻社交等更普适的消费场景。",
                "强化“低糖不牺牲风味”的表达，降低用户对口味寡淡的预设。",
            ],
        },
    };
}

function renderDemoSteps() {
    const container = document.getElementById("demoSteps");
    container.innerHTML = demoStages
        .map((stage, index) => {
            const active = index === demoState.stage ? "active" : "";
            const done = index < demoState.stage ? "done" : "";
            return `
                <article class="demo-step ${active} ${done}">
                    <span class="demo-step-index">${index + 1}</span>
                    <h4>${stage.title}</h4>
                    <p>${stage.note}</p>
                </article>
            `;
        })
        .join("");
}

function renderDemoAgents() {
    const grid = document.getElementById("agentGrid");
    grid.innerHTML = demoAgents
        .map((agent) => `
            <article class="agent-card">
                <h4>${agent.name}</h4>
                <div class="agent-meta">${agent.meta}</div>
                <div class="agent-meta">${agent.style}</div>
                <div class="agent-chips">
                    ${agent.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
                </div>
            </article>
        `)
        .join("");
}

function renderDemoNetwork() {
    const points = [
        [70, 36], [150, 28], [234, 42], [296, 94],
        [280, 178], [212, 220], [130, 220], [54, 182],
        [36, 112], [118, 110], [202, 110], [160, 160],
    ];
    const links = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0],
        [1, 9], [9, 11], [11, 5], [2, 10], [10, 11], [7, 11], [6, 9],
    ];
    const colors = ["#16836f", "#16836f", "#16836f", "#16836f", "#16836f", "#16836f", "#16836f", "#16836f", "#8f837c", "#16836f", "#16836f", "#16836f"];
    const svg = document.getElementById("networkSvg");
    const lineMarkup = links
        .map(([from, to]) => {
            const [x1, y1] = points[from];
            const [x2, y2] = points[to];
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,0,0.16)" stroke-width="2"></line>`;
        })
        .join("");
    const nodeMarkup = points
        .map(([x, y], index) => `
            <g>
                <circle cx="${x}" cy="${y}" r="18" fill="${colors[index]}"></circle>
                <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" fill="#fff">${index + 1}</text>
            </g>
        `)
        .join("");
    svg.innerHTML = `${lineMarkup}${nodeMarkup}`;
}

function sentimentText(sentiment) {
    if (sentiment === "positive") return "偏正面";
    if (sentiment === "negative") return "偏谨慎";
    return "观望中";
}

function renderDemoPost() {
    const postCard = document.getElementById("postCard");
    postCard.classList.remove("empty-state");
    postCard.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <span class="avatar-mark">研</span>
                <div>
                    <h4>市场调研模拟投放器</h4>
                    <div class="post-meta">@product_lab · 刚刚</div>
                </div>
            </div>
            <span class="section-badge small-badge">帖子已生成</span>
        </div>
        <p>${demoState.simulation.post.body}</p>
        <div class="post-tags">
            ${demoState.simulation.post.tags.map((tag) => `<span class="post-tag">${tag}</span>`).join("")}
        </div>
    `;
}

function renderDemoFeed(showReplies) {
    const items = showReplies ? demoState.simulation.comments : demoState.simulation.comments.filter((item) => item.type === "comment");
    const feedList = document.getElementById("feedList");
    document.getElementById("feedHint").textContent = showReplies ? "互动进行中" : "首轮评论已生成";
    feedList.innerHTML = items
        .map((item) => `
            <article class="feed-card ${item.type === "reply" ? "reply" : ""}">
                <div class="feed-top">
                    <div>
                        <h4>${item.name}</h4>
                        <div class="feed-meta">${item.meta}</div>
                    </div>
                    <span class="sentiment-pill ${item.sentiment}">${sentimentText(item.sentiment)}</span>
                </div>
                <p class="feed-text">${item.text}</p>
            </article>
        `)
        .join("");
}

function renderDemoReport() {
    const report = demoState.simulation.report;
    document.getElementById("reportHint").textContent = "分析结果已生成";
    document.getElementById("reportSummary").innerHTML = `
        <section class="report-block">
            <h4>用户总体态度</h4>
            <div class="bar-group">
                ${[
                    ["正面", report.sentiment.positive, "positive"],
                    ["中立", report.sentiment.neutral, "neutral"],
                    ["负面", report.sentiment.negative, "negative"],
                ].map(([label, value, tone]) => `
                    <div class="bar-row">
                        <span>${label}</span>
                        <div class="bar-track"><div class="bar-fill ${tone}" style="width:${value}%"></div></div>
                        <strong>${value}%</strong>
                    </div>
                `).join("")}
            </div>
        </section>
        <section class="report-block">
            <h4>核心关注点</h4>
            <div class="focus-grid">
                ${report.focusItems.map((item) => `
                    <div class="focus-item">
                        <span>${item.name}</span>
                        <strong>${item.percent}%</strong>
                    </div>
                `).join("")}
            </div>
        </section>
        <section class="report-block">
            <h4>调研结论</h4>
            <div class="list-stack">
                ${report.conclusions.map((item) => `<div class="list-item">${item}</div>`).join("")}
            </div>
        </section>
        <section class="report-block">
            <h4>优化建议</h4>
            <div class="list-stack">
                ${report.suggestions.map((item) => `<div class="list-item">${item}</div>`).join("")}
            </div>
        </section>
    `;
}

function resetDemo() {
    demoState.stage = 0;
    demoState.simulation = buildDemoSimulation();
    renderDemoSteps();
    renderDemoAgents();
    renderDemoNetwork();
    document.getElementById("feedHint").textContent = "等待评论";
    document.getElementById("reportHint").textContent = "等待生成";
    document.getElementById("postCard").className = "post-card empty-state";
    document.getElementById("postCard").textContent = "点击“生成帖子”后，这里会展示产品描述转化后的社交平台帖子。";
    document.getElementById("feedList").innerHTML = `
        <div class="placeholder-block">
            <p>这里展示：</p>
            <p>1. 首轮独立评论</p>
            <p>2. 二轮互动与观点碰撞</p>
        </div>
    `;
    document.getElementById("reportSummary").innerHTML = `
        <div class="placeholder-block">
            <p>将输出用户态度、核心关注点、风险提示与优化建议。</p>
        </div>
    `;
}

document.getElementById("postBtn").addEventListener("click", () => {
    demoState.simulation = buildDemoSimulation();
    demoState.stage = 1;
    renderDemoSteps();
    renderDemoPost();
});

document.getElementById("roundOneBtn").addEventListener("click", () => {
    demoState.simulation = buildDemoSimulation();
    demoState.stage = 2;
    renderDemoSteps();
    renderDemoPost();
    renderDemoFeed(false);
});

document.getElementById("roundTwoBtn").addEventListener("click", () => {
    demoState.simulation = buildDemoSimulation();
    demoState.stage = 2;
    renderDemoSteps();
    renderDemoPost();
    renderDemoFeed(true);
});

document.getElementById("reportBtn").addEventListener("click", () => {
    demoState.simulation = buildDemoSimulation();
    demoState.stage = 3;
    renderDemoSteps();
    renderDemoPost();
    renderDemoFeed(true);
    renderDemoReport();
});

document.getElementById("runDemoBtn").addEventListener("click", async () => {
    demoState.simulation = buildDemoSimulation();
    demoState.stage = 1;
    renderDemoSteps();
    renderDemoPost();
    await new Promise((resolve) => setTimeout(resolve, 240));
    demoState.stage = 2;
    renderDemoSteps();
    renderDemoFeed(false);
    await new Promise((resolve) => setTimeout(resolve, 240));
    renderDemoFeed(true);
    await new Promise((resolve) => setTimeout(resolve, 240));
    demoState.stage = 3;
    renderDemoSteps();
    renderDemoReport();
});

document.getElementById("resetBtn").addEventListener("click", resetDemo);

resetDemo();
