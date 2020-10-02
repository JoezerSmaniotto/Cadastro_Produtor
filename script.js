let ide =0;
    let editar = 0;
    let posicaoEditar = 0;
    let produtos = []; 
    const form = document.getElementById('form');
    form.reset(); //FORÇAR A RESETAR O FORMULÁRIO
    form.onsubmit = function(e) { // interrompe o comportamento padrão do tipo de evento, o onsubmit não carrega o formulario
    e.preventDefault();
            // Recupera os dados do form
            let nome = this.nome.value;
            let descr = document.getElementById('desc').value;
            let qtd = document.getElementById('qtd').value;
            let prec = document.getElementById('prec').value;
            let orin = form.ori; 
            const select = document.getElementById('descont');
            
            let descont = Array.from(select.selectedOptions);
            let desc = "";
            desc += "<ul>";
                if(descont.length == 0){
                    desc += "<li>Sem Desconto</li>";
                } 
                descont.forEach((item) => {
                        desc += `<li>${item.value}</li>`;
                });
            desc += "</ul>";

            const checklist = Array.from(this.itens);                    
            let conteudo = 0;
            
             let itensAdi='';
            itensAdi += "<ul>";
                checklist.forEach((item) => {
                    if (item.checked === true){
                        itensAdi  += `<li>${item.value}</li>`;
                        conteudo=1;
                    }
                })
                if(conteudo === 0){                     
                    itensAdi += "<li>Sem Itens</li>";
                }
            itensAdi  += "</ul>";
             
            // Cria Objeto
            let produto = {
                id:  '',
                nome: nome,   
                decr: descr, 
                qtd: qtd,
                prec: prec,
                ori:orin.value,
                descont: desc,
                itensAdi: itensAdi,
            }
            if(editar === 1){
                produto.id = produtos[posicaoEditar].id;
                produtos[posicaoEditar] = produto;
                document.getElementById('enviar').value = 'Cadastrar';
                document.getElementById('titulo').innerHTML = "Cadastro de Produtos";
                document.getElementById('titulo').style.color = 'black';
                document.getElementById('form').style.border = '';
            }else {
                ide++; 
                produto.id=ide;
                produtos.push(produto);
            }
            editar = 0;
            // Limpar os campos
            document.getElementById("form").reset();
            carregaTab(produtos);
            console.log(produto);
            
            
    };

    function carregaTab(produtos){
        const form = document.getElementById('form');
        let corpo_table = document.querySelector("tbody");
        corpo_table.innerHTML='';

        for(let i=0; i<produtos.length; i++){
            //produtos[i].id=i;
            // Crio os elementos 
            let linha = document.createElement("tr");
            let  id = document.createElement("td");
            let  nome = document.createElement("td");
            let  descri = document.createElement("td");
            let  qt = document.createElement("td");
            let preco = document.createElement("td");
            let orig = document.createElement("td");
            let descont = document.createElement("td");
            let itensAdd = document.createElement("td");
            let acoes = document.createElement("td");
            // Cria os Nós
            let texto_id = document.createTextNode(produtos[i].id); 
            let texto_nome = document.createTextNode(produtos[i].nome);
            let texto_descri = document.createTextNode(produtos[i].decr);
            let texto_qt = document.createTextNode(produtos[i].qtd);
            let texto_prec = document.createTextNode(produtos[i].prec);
            let texto_orig = document.createTextNode(produtos[i].ori); 
            let texto_des = produtos[i].descont;// Lista posso criar a lista e colocar aqui dentro ?
            let texto_adi = produtos[i].itensAdi; // Lista posso criar a lista e colocar aqui dentro ?
            let texto_Acao = `<button onclick="editarProd(${i})">&#x2607;</button> <button onclick="exluirProd(${i})">&#x2716;</button>`;
            // Vincula os nos aos elementos
            id.appendChild(texto_id);
            nome.appendChild(texto_nome);
            descri.appendChild(texto_descri);
            qt.appendChild(texto_qt);
            preco.appendChild(texto_prec);
            orig.appendChild(texto_orig);
            descont.innerHTML=(texto_des); // appendChild(texto_des);
            itensAdd.innerHTML=(texto_adi);//appendChild(texto_adi)
            acoes.innerHTML=(texto_Acao); 
            linha.appendChild(id);
            linha.appendChild(nome);
            linha.appendChild(descri);
            linha.appendChild(qt);
            linha.appendChild(preco);
            linha.appendChild(orig);
            linha.appendChild(descont); //
            linha.appendChild(itensAdd); //
            linha.appendChild(acoes); //
            // Vincula os elementos ao elementos do documento
            corpo_table.appendChild(linha);
        }
    };

    function exluirProd(id){
        let conf = window.confirm("Deseja Excluir Realmente ?");
        if(conf === true){
            //produtos[id] = "";
            produtos.splice(id,1);
            carregaTab(produtos);
        }
    }
    

    function editarProd(id){
        //alert("Entrou");
        this.nome.value = produtos[id].nome;
        document.getElementById('desc').value = produtos[id].decr;
        document.getElementById('qtd').value = produtos[id].qtd;
        document.getElementById('prec').value = produtos[id].prec;
        document.getElementById('enviar').value = 'SALVAR';
        document.getElementById('titulo').innerHTML = "Editar Produto";
        document.getElementById('titulo').style.color = 'red';
        document.getElementById('form').style.border = '2px solid red';
        document.getElementById('form').style.borderRadius = '15px';
        document.getElementById('form').style.padding ='5px'; 

        
        console.log(produtos[id]);
        if(produtos[id].ori==='Nacional')                                              
            form.ori[0].checked = true;
        else if (produtos[id].ori==='Importado'){
            form.ori[1].checked = true;
        }
        console.log(form.ori);
        posicaoEditar = id;
        editar =1;

    }

