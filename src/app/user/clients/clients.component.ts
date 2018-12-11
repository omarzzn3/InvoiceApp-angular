import { Component, OnInit } from '@angular/core';
import {ClientModel} from '../../shared/model/client/client.model';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
// require( 'datatables.net-bs4' )();

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {

  userId: number;
  clients: ClientModel[];

  dtOptions: DataTables.Settings = {};

  constructor(private clientApiService: ClientApiService,
              private clientMapperService: ClientMapperService,
              private authApiService: AuthApiService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.userId = this.authApiService.currentUserId;
    this.loadClients();

    this.dtOptions = {
      // columnDefs: [
      //   { width: '33%', targets: 0}
      // ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Polish.json'
      }
    };
  }

  private loadClients() {
    this.clientApiService.getClientsByUserId(this.userId).pipe(
      map(response => response.data),
      map(clientsDto => clientsDto
        .map(clientDto => this.clientMapperService.mapDtoToModel(clientDto)))
    ).subscribe(clients => this.clients = clients);
  }



}
