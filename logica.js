fetch('mock.json')
    .then(response => response.json())
    .then(usuarios => {

        document.getElementById('totalUsuarios').textContent = usuarios.length;

        const tbody = document.querySelector("#tabelaUsuarios tbody");
        const contagemPorCidade = {};

        usuarios.forEach(user => {
            const linha = `
                <tr data-email="${user.email}" data-telefone="${user.phone}" data-nome="${user.name}">
                    <td>${user.name}</td>
                    <td>${user.company.name}</td>
                    <td>${user.company.bs}</td>
                </tr>
            `;
            tbody.innerHTML += linha;

            const tbodySimples = document.querySelector("#tabelaUsernames tbody");
            tbodySimples.innerHTML = '';
            usuarios.forEach(user => {
                const linhaSimples = `
        <tr>
          <td>${user.name}</td>
          <td>${user.username}</td>
        </tr>
      `;
                tbodySimples.innerHTML += linhaSimples;
            });


            const cidade = user.address.city;
            contagemPorCidade[cidade] = (contagemPorCidade[cidade] || 0) + 1;
        });

        const gerarCores = (quantidade) => {
            const cores = [];
            for (let i = 0; i < quantidade; i++) {
                const cor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
                cores.push(cor);
            }
            return cores;
        };

        const cidades = Object.keys(contagemPorCidade);
        const quantidades = Object.values(contagemPorCidade);
        const cores = gerarCores(cidades.length);

        const ctx = document.getElementById('cidadeChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: cidades,
                datasets: [{
                    label: 'Usuários por Cidade',
                    data: quantidades,
                    backgroundColor: cores
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribuição de Usuários por Cidade'
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    });

const contextMenu = document.getElementById('contextMenu');
const tbody = document.querySelector('#tabelaUsuarios tbody');

tbody.addEventListener('mouseover', (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;

    const email = tr.getAttribute('data-email');
    const telefone = tr.getAttribute('data-telefone');
    const nome = tr.getAttribute('data-nome');

    contextMenu.innerHTML = `
        <strong>Contato de ${nome}</strong><br>
        <div><strong>Email:</strong> ${email}</div>
        <div><strong>Telefone:</strong> ${telefone}</div>
    `;

    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.style.display = 'block';
});

tbody.addEventListener('mouseleave', () => {
    contextMenu.style.display = 'none';
});


