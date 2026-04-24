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
            duration: 2.4,
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
    { title: "帖子生成", note: "把产品转成社交平台帖子" },
    { title: "社交模拟", note: "触发评论、互动与争论" },
    { title: "分析结果", note: "输出市场调研结论" },
];

const demoAgents = [
    { name: "校园轻饮派", meta: "20 岁 · 大学生", style: "追颜值、爱分享", tags: ["拍照", "新口味"] },
    { name: "白领控糖党", meta: "27 岁 · 品牌策划", style: "看成分、看负担", tags: ["低糖", "通勤"] },
    { name: "理性男生代表", meta: "26 岁 · 程序员", style: "看价格、看回购", tags: ["性价比", "复购"] },
    { name: "健身自律派", meta: "31 岁 · 健身教练", style: "看健康感与糖分", tags: ["运动", "配料表"] },
    { name: "家庭消费派", meta: "34 岁 · 团购团长", style: "看家庭场景", tags: ["囤货", "家庭消费"] },
    { name: "种草分享派", meta: "23 岁 · 美妆博主", style: "看包装与话题度", tags: ["颜值", "社交传播"] },
];

const personaCopy = {
    brand: "如果你负责拍板，这个平台最有价值的地方在于：它能先帮你看清这款新品是“可以试着推一下”，还是“现在推上去有点危险”。",
    product: "如果你负责产品，这个平台最有用的地方在于：它会提醒你先动哪里最划算，是价格、包装、口味，还是卖点表达。",
    operation: "如果你负责运营或营销，这个平台最有意思的地方在于：你能先看到用户会被哪句话打动，又会在哪句话面前犹豫。",
};

const examplePreset = {
    name: "轻果气泡饮",
    flavor: "白桃青柠",
    sugar: "低糖、轻负担",
    price: "5",
    packaging: "粉白渐变细长瓶，强调高颜值",
    audience: "年轻女性、学生党、轻健康人群",
    highlights: "主打果味、低糖、颜值高，适合拍照分享和通勤场景，希望突出健康感与轻松社交属性。",
};

const floatingIdeas = [
    "先看大家会不会买单",
    "先看他们会挑剔哪里",
    "先看宣传该怎么说",
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

function fillExamplePreset() {
    document.getElementById("productName").value = examplePreset.name;
    document.getElementById("productFlavor").value = examplePreset.flavor;
    document.getElementById("productSugar").value = examplePreset.sugar;
    document.getElementById("productPrice").value = examplePreset.price;
    document.getElementById("productPackaging").value = examplePreset.packaging;
    document.getElementById("productAudience").value = examplePreset.audience;
    document.getElementById("productHighlights").value = examplePreset.highlights;
}

function clearProductData() {
    document.getElementById("productName").value = "";
    document.getElementById("productFlavor").value = "";
    document.getElementById("productSugar").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productPackaging").value = "";
    document.getElementById("productAudience").value = "";
    document.getElementById("productHighlights").value = "";
}

function buildDemoSimulation() {
    const product = getProductData();
    const priceValue = Number(product.price) || 5;
    const positive = priceValue <= 5 ? 62 : 48;
    const negative = priceValue <= 5 ? 13 : 22;
    const neutral = 100 - positive - negative;
    return {
        post: {
            body: `新出了一款 ${product.flavor} 风味的 ${product.name}，主打 ${product.sugar}，包装是 ${product.packaging}。目标受众锁定 ${product.audience}，建议零售价约 ${product.price} 元。${product.highlights} 你会买吗？`,
            tags: ["新品试水", "用户共创", "社交讨论", "市场调研"],
        },
        comments: [
            { type: "comment", name: "校园轻饮派", meta: "20 岁 · 大学生", sentiment: "positive", text: "包装很容易让人记住，如果线下陈列好看，我会愿意先为了这个口味买一瓶试试。" },
            { type: "comment", name: "白领控糖党", meta: "27 岁 · 品牌策划", sentiment: "positive", text: "低糖这个表达对我有吸引力，但我还是会继续看口味完成度和成分信息。" },
            { type: "comment", name: "理性男生代表", meta: "26 岁 · 程序员", sentiment: priceValue <= 5 ? "neutral" : "negative", text: priceValue <= 5 ? "如果价格控制住，尝鲜门槛不高，我会考虑顺手买一瓶。" : "这个价格有点高了，如果只是颜值好看，长期回购的理由还不够。" },
            { type: "comment", name: "家庭消费派", meta: "34 岁 · 团购团长", sentiment: "neutral", text: "如果面向家庭或办公室场景的表达再明确一点，购买理由会更充分。" },
            { type: "reply", name: "社交媒体观察者", meta: "回应 理性男生代表", sentiment: "neutral", text: "这类产品前期靠颜值会有传播力，但后续还是得补上价格和场景理由。" },
            { type: "reply", name: "健身自律派", meta: "回应 白领控糖党", sentiment: "positive", text: "低糖是入场券，如果能强调“轻负担但不寡淡”，转化会更稳一些。" },
            { type: "reply", name: "种草分享派", meta: "回应 校园轻饮派", sentiment: "positive", text: "这款如果视觉拍出来够好看，很适合先在社交平台上被种草。" },
        ],
        report: {
            sentiment: { positive, neutral, negative },
            focusItems: [
                { name: "包装颜值", percent: 78 },
                { name: "价格敏感度", percent: priceValue <= 5 ? 58 : 72 },
                { name: "低糖健康感", percent: 64 },
                { name: "人群匹配度", percent: 52 },
            ],
            highlight: "这款产品具备较强的第一眼吸引力，尤其在颜值和低糖标签上容易被年轻用户注意到，但价格和长期回购理由仍需要补充得更扎实。",
            decision: {
                verdict: priceValue <= 5 ? "适合小范围试水首发" : "建议优化后再推向市场",
                priority: priceValue <= 5 ? "优先补强使用场景和复购理由" : "优先优化定价和购买理由",
                risk: priceValue <= 5 ? "过度依赖颜值传播，后期可能转化不足" : "价格高于尝鲜心理预期，容易被劝退",
            },
            conclusions: [
                "包装和颜色是最容易引发首轮讨论的卖点。",
                "低糖标签带来较高好感度，但用户仍会追问真实口味是否足够好喝。",
                "价格决定产品能否从尝鲜走向复购，尤其影响理性用户和家庭场景用户。",
            ],
            suggestions: [
                priceValue <= 5 ? "建议维持 5 元内的尝鲜门槛，结合渠道活动提升首发转化。" : "建议把尝鲜价控制在 5 元左右，或搭配组合优惠降低首次购买阻力。",
                "补充通勤、午后和轻社交等更普适的消费场景表达。",
                "强化“低糖但不牺牲风味”的卖点，减少用户对口味寡淡的预设。",
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
    const colors = ["#ff2a4d", "#16836f", "#8f837c", "#ff2a4d", "#16836f", "#ff2a4d", "#8f837c", "#16836f", "#ff2a4d", "#8f837c", "#16836f", "#ff2a4d"];
    const svg = document.getElementById("networkSvg");
    const lineMarkup = links
        .map(([from, to]) => {
            const [x1, y1] = points[from];
            const [x2, y2] = points[to];
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,0,0.12)" stroke-width="2"></line>`;
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
        <section class="report-hero">
            <div class="report-highlight">
                <h4>一句大白话结论</h4>
                <p>${report.highlight}</p>
            </div>
            <div class="report-decision">
                <h4>如果你现在要拍板</h4>
                <p>${report.decision.verdict}</p>
                <div class="decision-tag-row">
                    <span class="decision-tag">先做：${report.decision.priority}</span>
                    <span class="decision-tag">注意：${report.decision.risk}</span>
                </div>
            </div>
        </section>
        <section class="report-block">
            <h4>大家整体是什么态度</h4>
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
            <h4>大家最在意什么</h4>
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
            <h4>从讨论里能看出的几件事</h4>
            <div class="list-stack">
                ${report.conclusions.map((item) => `<div class="list-item">${item}</div>`).join("")}
            </div>
        </section>
        <section class="report-block">
            <h4>下一步更建议你这样做</h4>
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
            <p>这里会依次展示：</p>
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

function scrollToBlock(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openChoiceModal(modalId, backdropId) {
    document.body.classList.add("modal-open");
    document.getElementById(modalId).classList.add("visible");
    document.getElementById(backdropId).classList.add("visible");
}

function closeChoiceModal(modalId, backdropId) {
    document.getElementById(modalId).classList.remove("visible");
    document.getElementById(backdropId).classList.remove("visible");
    if (!document.querySelector(".guide-modal.visible") && !document.querySelector(".choice-modal.visible")) {
        document.body.classList.remove("modal-open");
    }
}

function closeAllChoiceModals() {
    closeChoiceModal("demoChoiceModal", "demoChoiceBackdrop");
    closeChoiceModal("flowChoiceModal", "flowChoiceBackdrop");
}

function openGuideModal() {
    document.body.classList.add("modal-open");
    document.getElementById("guideModal").classList.add("visible");
    document.getElementById("guideModalBackdrop").classList.add("visible");
}

function closeGuideModal() {
    document.body.classList.remove("modal-open");
    document.getElementById("guideModal").classList.remove("visible");
    document.getElementById("guideModalBackdrop").classList.remove("visible");
    sessionStorage.setItem("market-demo-guide-seen", "1");
}

function runStage(step) {
    demoState.simulation = buildDemoSimulation();

    if (step === 1) {
        demoState.stage = 1;
        renderDemoSteps();
        renderDemoPost();
        scrollToBlock("postPanel");
        return;
    }

    if (step === 2) {
        demoState.stage = 2;
        renderDemoSteps();
        renderDemoPost();
        renderDemoFeed(false);
        scrollToBlock("feedPanel");
        return;
    }

    if (step === 3) {
        demoState.stage = 2;
        renderDemoSteps();
        renderDemoPost();
        renderDemoFeed(true);
        scrollToBlock("feedPanel");
        return;
    }

    demoState.stage = 3;
    renderDemoSteps();
    renderDemoPost();
    renderDemoFeed(true);
    renderDemoReport();
    scrollToBlock("reportPanel");
}

function loadExampleAndPrompt() {
    fillExamplePreset();
    resetDemo();
    scrollToBlock("managementModule");
    window.setTimeout(() => {
        openChoiceModal("demoChoiceModal", "demoChoiceBackdrop");
    }, 380);
}

function bindGuideActions() {
    const openButtons = [
        document.getElementById("navGuideBtn"),
        document.getElementById("storyGuideBtn"),
        document.getElementById("floatingGuideBtn"),
    ];
    openButtons.forEach((button) => button?.addEventListener("click", openGuideModal));

    document.getElementById("guideClose").addEventListener("click", closeGuideModal);
    document.getElementById("guideSkip").addEventListener("click", closeGuideModal);
    document.getElementById("guideModalBackdrop").addEventListener("click", closeGuideModal);
    document.getElementById("guideStart").addEventListener("click", () => {
        closeGuideModal();
        loadExampleAndPrompt();
    });

    if (!sessionStorage.getItem("market-demo-guide-seen")) {
        window.setTimeout(openGuideModal, 650);
    }
}

function bindPersonaCards() {
    document.querySelectorAll(".persona-card").forEach((card) => {
        card.addEventListener("click", () => {
            document.querySelectorAll(".persona-card").forEach((item) => item.classList.remove("active"));
            card.classList.add("active");
            const key = card.getAttribute("data-persona");
            document.getElementById("personaResponse").textContent = personaCopy[key];
        });
    });
}

function bindExampleButtons() {
    [document.getElementById("loadExampleBtn"), document.getElementById("toolbarExampleBtn")].forEach((button) => {
        button?.addEventListener("click", loadExampleAndPrompt);
    });
}

function bindChoiceModals() {
    document.getElementById("demoChoiceClose").addEventListener("click", () => closeChoiceModal("demoChoiceModal", "demoChoiceBackdrop"));
    document.getElementById("demoChoiceBackdrop").addEventListener("click", () => closeChoiceModal("demoChoiceModal", "demoChoiceBackdrop"));
    document.getElementById("demoChoiceNo").addEventListener("click", () => closeChoiceModal("demoChoiceModal", "demoChoiceBackdrop"));
    document.getElementById("demoChoiceYes").addEventListener("click", () => {
        closeChoiceModal("demoChoiceModal", "demoChoiceBackdrop");
        openChoiceModal("flowChoiceModal", "flowChoiceBackdrop");
    });

    document.getElementById("flowChoiceClose").addEventListener("click", () => closeChoiceModal("flowChoiceModal", "flowChoiceBackdrop"));
    document.getElementById("flowChoiceBackdrop").addEventListener("click", () => closeChoiceModal("flowChoiceModal", "flowChoiceBackdrop"));
    document.querySelectorAll("[data-flow-step]").forEach((button) => {
        button.addEventListener("click", () => {
            const step = Number(button.getAttribute("data-flow-step"));
            closeChoiceModal("flowChoiceModal", "flowChoiceBackdrop");
            runStage(step);
        });
    });
}

function rotateGuideButtonCopy() {
    const button = document.getElementById("floatingGuideBtn");
    const label = button?.querySelector("span");
    if (!label) return;
    let index = 0;
    window.setInterval(() => {
        index = (index + 1) % floatingIdeas.length;
        label.textContent = floatingIdeas[index];
    }, 3600);
}

document.getElementById("postBtn").addEventListener("click", () => runStage(1));
document.getElementById("roundOneBtn").addEventListener("click", () => runStage(2));
document.getElementById("roundTwoBtn").addEventListener("click", () => runStage(3));
document.getElementById("reportBtn").addEventListener("click", () => runStage(4));

document.getElementById("resetBtn").addEventListener("click", () => {
    clearProductData();
    closeAllChoiceModals();
    resetDemo();
    scrollToBlock("managementModule");
});

document.getElementById("runDemoBtn").addEventListener("click", () => {
    demoState.simulation = buildDemoSimulation();
    renderDemoPost();

    window.setTimeout(() => {
        demoState.stage = 1;
        renderDemoSteps();
        scrollToBlock("postPanel");
    }, 180);

    window.setTimeout(() => {
        demoState.stage = 2;
        renderDemoSteps();
        renderDemoFeed(false);
        scrollToBlock("feedPanel");
    }, 880);

    window.setTimeout(() => {
        renderDemoFeed(true);
    }, 1680);

    window.setTimeout(() => {
        demoState.stage = 3;
        renderDemoSteps();
        renderDemoReport();
        scrollToBlock("reportPanel");
    }, 2480);
});

fillExamplePreset();
resetDemo();
bindGuideActions();
bindPersonaCards();
bindExampleButtons();
bindChoiceModals();
rotateGuideButtonCopy();
lucide.createIcons();
